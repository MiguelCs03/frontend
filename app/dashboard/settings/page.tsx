"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2" 
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Project Updates</span>
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2" 
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Marketing Emails</span>
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Contact Support</Button>
              <Button className="w-full bg-gray-700 hover:bg-gray-600">Schedule Call</Button>
              <Button className="w-full bg-gray-700 hover:bg-gray-600">View Documentation</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-gray-700 hover:bg-gray-600">Change Password</Button>
              <Button className="w-full bg-gray-700 hover:bg-gray-600">Enable 2FA</Button>
              <Button className="w-full bg-red-600 hover:bg-red-700">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
