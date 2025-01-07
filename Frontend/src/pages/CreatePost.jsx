import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage"
import React, { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({})
  // console.log(formData)

  const [createPostError, setCreatePostError] = useState(null)

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!")
        toast({ title: "Please select an image!" })
        return
      }

      setImageUploading(true)

      setImageUploadError(null)

      const uploadedFile = await uploadFile(file)
      const postImageUrl = getFilePreview(uploadedFile.$id)

      setFormData({ ...formData, image: postImageUrl })

      toast({ title: "Image Uploaded Successfully!" })

      if (postImageUrl) {
        setImageUploading(false)
      }
    } catch (error) {
      setImageUploadError("Image upload failed")
      console.log(error)

      toast({ title: "Image upload failed!" })
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." })
        setCreatePostError(data.message)

        return
      }

      if (res.ok) {
        toast({ title: "Article Published Successfully!" })
        setCreatePostError(null)

        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      toast({ title: "Something went wrong! Please try again." })
      setCreatePostError("Something went wrong! Please try again.")
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-teal-500 rounded-lg shadow-lg">
    <h1 className="text-center text-4xl font-semibold text-white my-6">
      Create a Post
    </h1>
  
    <form className="space-y-6 p-6 bg-white bg-opacity-60 rounded-lg shadow-md backdrop-blur-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          required
          id="title"
          className="w-full sm:w-2/3 h-12 border border-gray-300 rounded-md px-4 focus:ring-2 focus:ring-blue-500 relative overflow-hidden"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {/* Animated Border for Title */}
        <span className="absolute inset-0 border-2 border-indigo-600 animate-pulse rounded-md"></span>
  
        {/* Category Dropdown */}
        <select
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full sm:w-1/3 h-12 border border-gray-300 rounded-md px-4 focus:ring-2 focus:ring-blue-500 relative overflow-hidden"
        >
          <option value="worldnews">Local News</option>
          <option value="sportsnews">Local Sports News</option>
          <option value="localnews">Local Accident News</option>
        </select>
        {/* Animated Border for Category */}
        <span className="absolute inset-0 border-2 border-indigo-600 animate-pulse rounded-md"></span>
      </div>
  
      {/* File Upload Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-center border-2 border-dashed border-gray-300 p-4 rounded-md">
        <input
          type="file"
          accept="image/*"
          className="w-full sm:w-2/3 h-12 border border-gray-300 rounded-md px-4 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {/* Upload Button */}
        <button
          type="button"
          className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-all duration-200"
          onClick={handleUploadImage}
        >
          {imageUploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
  
      {/* Image Upload Error */}
      {imageUploadError && (
        <p className="text-red-600 mt-3">{imageUploadError}</p>
      )}
  
      {/* Image Preview */}
      {formData.image && (
        <img
          src={formData.image}
          alt="Uploaded"
          className="w-full h-72 object-cover rounded-md mt-6"
        />
      )}
  
      {/* React Quill Editor for Content */}
      <ReactQuill
        theme="snow"
        placeholder="Write something here..."
        className="h-72 border border-gray-300 rounded-md mt-6 focus:ring-2 focus:ring-blue-500"
        required
        onChange={(value) => setFormData({ ...formData, content: value })}
      />
  
      {/* Publish Button */}
      <button
        type="submit"
        className="w-full h-12 bg-green-500 text-white font-semibold rounded-md mt-6 hover:bg-green-600 transition-all duration-200"
      >
        Publish Your Article
      </button>
  
      {/* Post Creation Error */}
      {createPostError && (
        <p className="text-red-600 mt-5">{createPostError}</p>
      )}
    </form>
  </div>
  
  )
}

export default CreatePost
