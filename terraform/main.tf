// Configure the Google Cloud provider
provider "google" {
  credentials = file("/Users/ianmatheson/Documents/Scorecast-a931a57b6bc8.json")
  project     = "scorecast-269923"
  region      = "us-west1"
}

// Terraform plugin for creating random ids
resource "random_id" "instance_id" {
  byte_length = 8
}

// A single Google Cloud Engine instance
resource "google_compute_instance" "default" {
  name         = "scorecast-${random_id.instance_id.hex}"
  machine_type = "f1-micro"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "centos-8-v20200205"
    }
  }

  // Make sure flask is installed on all new instances for later steps
  metadata_startup_script = "sudo yum update; sudo yum install -yq build-essential python-pip rsync"

  network_interface {
    network = "default"

    access_config {
      // Include this section to give the VM an external ip address
    }
  }
}

// A variable for extracting the external ip of the instance
output "ip" {
  value = "${google_compute_instance.default.network_interface.0.access_config.0.nat_ip}"
}

