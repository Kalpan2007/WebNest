import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { User, Edit, Star, Calendar, MapPin, Phone, Mail, Building, Crown, TrendingUp, Award, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getInitials } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'

export function ClientProfile() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await fetch('/api/client/profile')
      if (!response.ok) throw new Error('Failed to fetch profile')
      return response.json()
    }
  })

  const { data: stats } = useQuery({
    queryKey: ['profile-stats'],
    queryFn: async () => {
      const response = await fetch('/api/client/profile/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json()
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <Button onClick={() => navigate('/client/settings')} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-2xl">
                    {user?.name ? getInitials(user.name) : <User className="h-12 w-12" />}
                  </AvatarFallback>
                </Avatar>
                {user?.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{user?.name}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                    <Badge variant={user?.isPremium ? 'default' : 'secondary'} className="flex items-center gap-1">
                      {user?.isPremium ? <Crown className="h-3 w-3" /> : null}
                      {user?.isPremium ? 'Premium Client' : 'Basic Client'}
                    </Badge>
                    <Badge variant="outline">Member since {new Date(user?.createdAt || Date.now()).getFullYear()}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user?.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{user.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Account Type</span>
                    <Badge variant={user?.isPremium ? 'default' : 'secondary'}>
                      {user?.isPremium ? 'Premium' : 'Basic'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Verified</span>
                    <Badge variant={user?.isEmailVerified ? 'default' : 'destructive'}>
                      {user?.isEmailVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                  {user?.isPremium && user?.premiumExpiresAt && (
                    <div className="flex items-center justify-between">
                      <span>Premium Expires</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(user.premiumExpiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {!user?.isPremium && (
                    <Button 
                      onClick={() => navigate('/client/premium')} 
                      className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Projects</span>
                    <span className="font-semibold">{stats?.data?.totalProjects || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Projects</span>
                    <span className="font-semibold">{stats?.data?.activeProjects || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completed Projects</span>
                    <span className="font-semibold">{stats?.data?.completedProjects || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{stats?.data?.averageRating || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Projects</p>
                      <p className="text-2xl font-bold">{stats?.data?.totalProjects || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Award className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{stats?.data?.completedProjects || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-2xl font-bold">{stats?.data?.activeProjects || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">${stats?.data?.totalSpent?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent account activity and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="h-2 w-2 bg-blue-600 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Profile viewed</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Account created</p>
                      <p className="text-xs text-muted-foreground">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}