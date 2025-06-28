"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Billing & Payments</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Plan:</span>
                <Badge className="bg-emerald-500/20 text-emerald-400">Enterprise</Badge>
              </div>
              <div className="flex justify-between">
                <span>Monthly Cost:</span>
                <span className="font-bold">$2,500/month</span>
              </div>
              <div className="flex justify-between">
                <span>Next Billing:</span>
                <span>Jan 15, 2024</span>
              </div>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>•••• •••• •••• 4242</span>
                  <Badge variant="outline">Primary</Badge>
                </div>
                <div className="text-sm text-gray-400 mt-1">Expires 12/25</div>
              </div>
              <Button className="w-full bg-gray-700 hover:bg-gray-600">Add Payment Method</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Dec 15, 2024", amount: "$2,500", status: "Paid", invoice: "INV-001" },
              { date: "Nov 15, 2024", amount: "$2,500", status: "Paid", invoice: "INV-002" },
              { date: "Oct 15, 2024", amount: "$2,500", status: "Paid", invoice: "INV-003" },
            ].map((bill, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-700 rounded-lg">
                <div>
                  <div className="font-medium">{bill.invoice}</div>
                  <div className="text-sm text-gray-400">{bill.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{bill.amount}</div>
                  <Badge className="bg-emerald-500/20 text-emerald-400">{bill.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
