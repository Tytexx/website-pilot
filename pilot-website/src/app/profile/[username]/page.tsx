"use client"

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Badge } from "~/components/ui/badge"
import { Camera, Edit3, Save, X, Plus, MapPin, LinkIcon, Github, Linkedin, Twitter, Mail, Calendar } from "lucide-react"

// Mock user data - in real app this would come from your database
const usersData = {
  hussain_ak: {
    id: "user-123",
    firstName: "Hussain",
    lastName: "Abdul Kadhir",
    username: "hussain_ak",
    email: "hussain@1e1x.qa",
    bio: "Passionate data scientist and UI designer building the future of innovation in Qatar. Love turning complex data into beautiful, actionable insights.",
    location: "Doha, Qatar",
    website: "https://hussain-ak.dev",
    github: "hussain-ak",
    linkedin: "hussain-abdul-kadhir",
    twitter: "hussain_ak_dev",
    avatar_url: "/placeholder.svg?height=120&width=120",
    joinDate: "2024-03-15",
    roles: ["Data Scientist", "UI Designer"],
    skills: ["Python", "SQL", "Figma", "Data Visualization", "UX Research", "Machine Learning", "React", "TypeScript"],
    projects: 8,
    contributions: 24,
    followers: 156,
    following: 89,
  },
  aman_m: {
    id: "user-124",
    firstName: "Aman",
    lastName: "Mohammed",
    username: "aman_m",
    email: "aman@1e1x.qa",
    bio: "Web developer specializing in React and Node.js. Building innovative solutions for Qatar's tech ecosystem.",
    location: "Doha, Qatar",
    website: "https://amanm.dev",
    github: "aman-m",
    linkedin: "aman-mohammed",
    twitter: "aman_m_dev",
    avatar_url: "/placeholder.svg?height=120&width=120",
    joinDate: "2024-02-10",
    roles: ["Web Developer"],
    skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "Git", "MongoDB", "Express", "Next.js"],
    projects: 12,
    contributions: 37,
    followers: 98,
    following: 112,
  },
  sherin: {
    id: "user-125",
    firstName: "Sherin",
    lastName: "Al-Najjar",
    username: "sherin",
    email: "sherin@1e1x.qa",
    bio: "Frontend developer with a passion for creating beautiful, responsive interfaces. Focused on accessibility and user experience.",
    location: "Doha, Qatar",
    website: "https://sherin.design",
    github: "sherin-dev",
    linkedin: "sherin-alnajjar",
    twitter: "sherin_codes",
    avatar_url: "/placeholder.svg?height=120&width=120",
    joinDate: "2024-01-05",
    roles: ["Frontend Developer"],
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "UI/UX", "Tailwind CSS", "Figma"],
    projects: 15,
    contributions: 42,
    followers: 124,
    following: 87,
  },
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const { username } = params
  const [userData, setUserData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [newSkill, setNewSkill] = useState("")
  const [newRole, setNewRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  useEffect(() => {
    // In a real app, you'd fetch user data from API
    const fetchUserData = async () => {
      setIsLoadingProfile(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Check if user exists in our mock data
        if (usersData[username]) {
          setUserData(usersData[username])
          setEditData(usersData[username])

          // In a real app, you'd check if this profile belongs to the current logged-in user
          // For demo purposes, we'll say hussain_ak is the current user
          setIsCurrentUser(username === "hussain_ak")
        } else {
          // Handle user not found
          console.error("User not found")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoadingProfile(false)
      }
    }

    fetchUserData()
  }, [username])

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setUserData(editData)
    setIsEditing(false)
    setIsLoading(false)
  }

  const handleCancel = () => {
    setEditData(userData)
    setIsEditing(false)
    setNewSkill("")
    setNewRole("")
  }

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter((skill: string) => skill !== skillToRemove),
    })
  }

  const addRole = () => {
    if (newRole.trim() && !editData.roles.includes(newRole.trim())) {
      setEditData({
        ...editData,
        roles: [...editData.roles, newRole.trim()],
      })
      setNewRole("")
    }
  }

  const removeRole = (roleToRemove: string) => {
    setEditData({
      ...editData,
      roles: editData.roles.filter((role: string) => role !== roleToRemove),
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData({
      ...editData,
      [field]: value,
    })
  }

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar Section */}
                <div className="relative">
                  <img
                    src={userData.avatar_url || "/placeholder.svg"}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {userData.firstName} {userData.lastName}
                      </h1>
                      <p className="text-gray-600 mb-2">@{userData.username}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {userData.roles.map((role: string) => (
                          <Badge key={role} variant="secondary" className="bg-gray-100 text-gray-700">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {isCurrentUser && !isEditing && (
                      <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                        <Edit3 className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                    {!isCurrentUser && (
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Follow
                      </Button>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{userData.projects}</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{userData.contributions}</div>
                      <div className="text-sm text-gray-600">Contributions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{userData.followers}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{userData.following}</div>
                      <div className="text-sm text-gray-600">Following</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 mb-4">{userData.bio}</p>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userData.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined{" "}
                      {new Date(userData.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {userData.email}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          {isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Edit Profile
                  <div className="flex gap-2">
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} size="sm">
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={editData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={editData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, Country"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Links</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          value={editData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          placeholder="https://yourwebsite.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="github"
                          value={editData.github}
                          onChange={(e) => handleInputChange("github", e.target.value)}
                          placeholder="username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="linkedin"
                          value={editData.linkedin}
                          onChange={(e) => handleInputChange("linkedin", e.target.value)}
                          placeholder="username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="twitter"
                          value={editData.twitter}
                          onChange={(e) => handleInputChange("twitter", e.target.value)}
                          placeholder="username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roles */}
                <div>
                  <Label>Roles</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editData.roles.map((role: string) => (
                      <Badge
                        key={role}
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 flex items-center gap-1"
                      >
                        {role}
                        <button onClick={() => removeRole(role)} className="hover:text-blue-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="Add a role..."
                      onKeyPress={(e) => e.key === "Enter" && addRole()}
                    />
                    <Button onClick={addRole} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editData.skills.map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-green-100 text-green-700 flex items-center gap-1"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-green-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills & Expertise */}
          {!isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="bg-green-100 text-green-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Links */}
          {!isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userData.website && (
                    <a
                      href={userData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <LinkIcon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">Website</span>
                    </a>
                  )}
                  {userData.github && (
                    <a
                      href={`https://github.com/${userData.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <Github className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                  )}
                  {userData.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${userData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                  )}
                  {userData.twitter && (
                    <a
                      href={`https://twitter.com/${userData.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">Twitter</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}