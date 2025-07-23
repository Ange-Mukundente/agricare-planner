variable "resource_group_name" {
  description = "The name of the resource group."
  type        = string
  default     = "agricare-rg"
}

variable "location" {
  description = "The Azure region where resources will be created."
  type        = string
  default     = "West US 2"
}

variable "app_name" {
  description = "A unique name for the application and its resources."
  type        = string
  default     = "agricare-app-ange" # <-- CHANGE TO THIS SHORTER NAME
}