# Phase 2: IaC, Containerization & Manual Deployment

## 1. Live Public URL

My AgriCare Planner application is live at the following URLs:
https://agricare-app-ange-frontend-ca--3u6z43j.thankfulbay-c8d71b93.westus2.azurecontainerapps.io
https://agricare-app-ange-backend-ca--9l7az7r.thankfulbay-c8d71b93.westus2.azurecontainerapps.io

## 2. Screenshots of Provisioned Resources

Here are screenshots from the Azure Portal showing the successfully provisioned resources via Terraform.
https://drive.google.com/drive/folders/1o7Ir4KKpRiOq0aIAOcy6aIdIbc30Zg34?usp=sharing

## 3. Link to Peer Review

I provided a constructive peer review on the following Pull Requests:

https://github.com/vuwase/bookhub/pull/1
https://github.com/vanessaU4/Book_hub/pull/25

## 4. Reflection on Challenges and Learnings

### Challenges with IaC (Terraform)
The biggest challenge with Terraform was understanding the dependency graph and the strict syntax. Initially, I struggled with resource names needing to be globally unique, which caused my `terraform apply` to fail several times. Debugging Terraform errors was also tricky; the error messages are detailed but can be overwhelming until you learn to pinpoint the exact resource and attribute that is causing the issue. Another challenge was managing secrets like the database connection string. While outputting it is convenient for development, I realized how critical it is to use a more secure method like Azure Key Vault in a real-world scenario.

### The Manual Deployment Process
The manual deployment process highlighted the "connective tissue" between different cloud services. The most difficult part was ensuring the environment variables were set correctly. Forgetting to set the `MONGODB_URI` on the backend App Service or the API URL for the frontend caused initial 500 errors that took time to debug. It gave me a deep appreciation for the automation that a CI/CD pipeline provides. Pushing the images to ACR was straightforward, but the manual configuration in the Azure Portal felt error-prone. It's easy to forget a step or click the wrong thing, which reinforced the value of automating this entire process, which I look forward to in the next phase.
