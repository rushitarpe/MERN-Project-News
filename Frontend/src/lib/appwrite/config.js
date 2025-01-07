import { Client, Storage } from "appwrite"

export const appwriteConfig = {
  projectId: "677cb9dd00378b408a47",
  storageId: "677cba7f00315fbc06f2",
  url:"https://cloud.appwrite.io/v1",
}

export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const storage = new Storage(client)
