# 1. Create a Resource Group to hold all our resources
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

# 2. Create an Azure Container Registry (ACR) to store our Docker images
resource "azurerm_container_registry" "main" {
  name                = "${replace(var.app_name, "-", "")}acr"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

# 3. Create a Cosmos DB Account (for MongoDB API)
resource "azurerm_cosmosdb_account" "main" {
  name                = "${var.app_name}-db"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  offer_type          = "Standard"
  kind                = "MongoDB"

  enable_automatic_failover = false # This is deprecated but still works for now

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = azurerm_resource_group.main.location
    failover_priority = 0
  }
}

# --- NEW: Create a Container Apps Environment ---
# This is the logical boundary for our container apps
resource "azurerm_container_app_environment" "main" {
  name                = "${var.app_name}-env"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
}

# --- NEW: Create the Backend Container App ---
resource "azurerm_container_app" "backend" {
  name                         = "${var.app_name}-backend-ca"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  template {
    container {
      name   = "agricare-backend-container"
      image  = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest" # Placeholder image
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }

  secret {
    name  = "mongodb-uri"
    value = azurerm_cosmosdb_account.main.connection_strings[0]
  }

  ingress {
    external_enabled = true
    target_port      = 3001 # Your backend runs on port 3001
    
    # ADDED THIS BLOCK TO FIX THE ERROR
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}

# --- NEW: Create the Frontend Container App ---
resource "azurerm_container_app" "frontend" {
  name                         = "${var.app_name}-frontend-ca"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  template {
    container {
      name   = "agricare-frontend-container"
      image  = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest" # Placeholder image
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }

  ingress {
    external_enabled = true
    target_port      = 80 # Your frontend Nginx runs on port 80

    # ADDED THIS BLOCK TO FIX THE ERROR
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}