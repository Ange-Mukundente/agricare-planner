output "acr_login_server" {
  description = "The login server for the Azure Container Registry."
  value       = azurerm_container_registry.main.login_server
}

output "cosmosdb_connection_string" {
  description = "The connection string for the Cosmos DB (MongoDB API)."
  value       = azurerm_cosmosdb_account.main.connection_strings[0]
  sensitive   = true
}

output "backend_url" {
  description = "The public URL of the backend service."
  value       = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
}

output "frontend_url" {
  description = "The public URL of the frontend service."
  value       = "https://${azurerm_container_app.frontend.latest_revision_fqdn}"
}