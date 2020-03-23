// Configure the Google Cloud provider
provider "google" {
  credentials = file("./gcp-credentials.json")
  project     = "scorecast-269923"
  region      = "us-west1"
}

// A single Google Cloud Engine instance
resource "google_compute_instance" "default" {
  name         = "scorecast"
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

// Single Google Cloud Database instance
resource "google_sql_database_instance" "instance" {
  name             = "scorecast-postgres"
  database_version = "POSTGRES_11"
  region           = "us-central1"

  settings {
    tier = "db-f1-micro"
  }
}

// Single Google Kubernetes Engine instsance
resource "google_container_cluster" "primary" {
  name     = "scorecast-gke-cluster"
  location = "us-central1-a"

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "scorecast-node-pool"
  location   = "us-central1-a"
  cluster    = google_container_cluster.primary.name
  initial_node_count = 1
  depends_on = [
    google_container_cluster.primary,
  ]

  autoscaling {
    min_node_count=0
    max_node_count=1
  }

  node_config {
    preemptible  = false
    machine_type = "n1-standard-1"

    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}

// A variable for extracting the external ip of the instance
output "ip" {
  value = "${google_compute_instance.default.network_interface.0.access_config.0.nat_ip}"
}

