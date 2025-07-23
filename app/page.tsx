"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface GlobalInputs {
  price: number
  revenueGoal: number
  avgViews: number
  userCtr: number
  userLpConv: number
}

const defaultGlobals: GlobalInputs = {
  price: 197,
  revenueGoal: 100000,
  avgViews: 10000,
  userCtr: 1.2,
  userLpConv: 2.8,
}

// Reference scenarios (read-only) - 10 professional levels
const referenceScenarios = [
  { name: "Conservative - Poor", ctr: 0.3, lpConv: 1.0 },
  { name: "Conservative - Average", ctr: 0.5, lpConv: 1.5 },
  { name: "Conservative - Good", ctr: 0.8, lpConv: 2.0 },
  { name: "Realistic - Poor", ctr: 1.0, lpConv: 2.5 },
  { name: "Realistic - Average", ctr: 1.5, lpConv: 3.5 },
  { name: "Realistic - Good", ctr: 2.0, lpConv: 4.5 },
  { name: "Optimistic - Average", ctr: 3.0, lpConv: 6.0 },
  { name: "Optimistic - Excellent", ctr: 4.5, lpConv: 8.0 },
  { name: "Dream Scenario", ctr: 6.0, lpConv: 10.0 },
  { name: "Unicorn", ctr: 8.0, lpConv: 12.0 },
]

export default function FunnelMath() {
  const [globals, setGlobals] = useState<GlobalInputs>(defaultGlobals)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedGlobals = localStorage.getItem("funnelMath-globals")
    if (savedGlobals) {
      setGlobals(JSON.parse(savedGlobals))
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("funnelMath-globals", JSON.stringify(globals))
    }
  }, [globals, isLoaded])

  const updateGlobal = (key: keyof GlobalInputs, value: number) => {
    setGlobals((prev) => ({ ...prev, [key]: Math.max(0, value) }))
  }

  const resetToDefaults = () => {
    setGlobals(defaultGlobals)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const formatFrequency = (videosNeeded: number) => {
    if (videosNeeded === 0) return "—"

    // If more than 365 videos needed, that's more than daily
    if (videosNeeded > 365) {
      return "Daily or more"
    }

    // If around 300-365 videos, that's approximately daily
    if (videosNeeded >= 300) {
      return "Daily"
    }

    const monthsBetweenVideos = 12 / videosNeeded

    if (monthsBetweenVideos >= 1) {
      const months = Math.round(monthsBetweenVideos)
      return `Every ${months} month${months > 1 ? "s" : ""}`
    } else if (monthsBetweenVideos >= 0.25) {
      const weeks = Math.round(monthsBetweenVideos * 4.33) // 4.33 weeks per month
      return weeks === 0 ? "Multiple per week" : `Every ${weeks} week${weeks > 1 ? "s" : ""}`
    } else {
      const days = Math.round(monthsBetweenVideos * 30)
      return `Every ${days} day${days > 1 ? "s" : ""}`
    }
  }

  const calculateResults = () => {
    // User's custom scenario
    const userScenario = {
      name: "Your Scenario",
      ctr: globals.userCtr,
      lpConv: globals.userLpConv,
      isUser: true,
    }

    // Create all scenarios array
    const allScenarios = [userScenario, ...referenceScenarios.map((s) => ({ ...s, isUser: false }))]

    return allScenarios.map((scenario) => {
      const funnelConv = (scenario.ctr / 100) * (scenario.lpConv / 100)

      if (funnelConv === 0) {
        return {
          scenario: scenario.name,
          ctr: scenario.ctr,
          lpConv: scenario.lpConv,
          funnelConv: 0,
          viewsNeeded: "—",
          videosNeeded: "—",
          frequency: "—",
          isUser: scenario.isUser,
        }
      }

      const viewsNeeded = Math.ceil(globals.revenueGoal / (globals.price * funnelConv))
      const videosNeeded = Math.ceil(viewsNeeded / globals.avgViews)
      const frequency = formatFrequency(videosNeeded)

      return {
        scenario: scenario.name,
        ctr: scenario.ctr,
        lpConv: scenario.lpConv,
        funnelConv,
        viewsNeeded,
        videosNeeded,
        frequency,
        isUser: scenario.isUser,
      }
    })
  }

  const results = calculateResults()

  const monthlyRevenue = globals.revenueGoal / 12

  // Don't render until loaded to prevent slider issues
  if (!isLoaded) {
    return <div className="min-h-screen bg-[#F5F4F2] flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F5F4F2] p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight mb-3">
            Creator Income Calculator
          </h1>
          <p className="text-lg text-[#4A4A4A] font-medium max-w-2xl mx-auto">
            Play out YouTube revenue scenarios for your creator business.
          </p>
        </div>

        {/* Global Inputs */}
        <Card className="bg-white border-[#E8E6E3] shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex justify-between items-center font-bold text-xl text-[#1A1A1A]">
              Your Business
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefaults}
                className="border-[#E8E6E3] hover:bg-[#F5F4F2] bg-transparent text-[#1A1A1A]"
              >
                Reset to Defaults
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price" className="text-base font-semibold text-[#4A4A4A]">
                  Product Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={globals.price}
                  onChange={(e) => updateGlobal("price", Number(e.target.value))}
                  min="0"
                  step="10"
                  className="mt-2 text-lg border-[#E8E6E3]"
                />
              </div>
              <div>
                <Label htmlFor="avgViews" className="text-base font-semibold text-[#4A4A4A]">
                  Avg Views per Video
                </Label>
                <Input
                  id="avgViews"
                  type="number"
                  value={globals.avgViews}
                  onChange={(e) => updateGlobal("avgViews", Number(e.target.value))}
                  min="0"
                  step="1000"
                  className="mt-2 text-lg border-[#E8E6E3]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold text-[#4A4A4A]">
                Annual Revenue Goal:{" "}
                <span className="text-xl font-bold text-[#1A1A1A]">{formatCurrency(globals.revenueGoal)}</span>
              </Label>
              <p className="text-[#6A6A6A] font-medium">Monthly revenue: {formatCurrency(monthlyRevenue)}</p>
              <Slider
                value={[globals.revenueGoal]}
                onValueChange={([value]) => updateGlobal("revenueGoal", value)}
                max={1000000}
                min={10000}
                step={10000}
                className="w-full py-2"
              />
              <div className="flex justify-between text-sm text-[#6A6A6A] font-medium mt-2">
                <span>$10K</span>
                <span>$1M</span>
              </div>
            </div>

            {/* User's Conversion Rates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E6E3]">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-[#4A4A4A]">
                  YouTube Views → Landing Page:{" "}
                  <span className="text-lg font-bold text-[#1A1A1A]">{globals.userCtr.toFixed(1)}%</span>
                </Label>
                <Slider
                  value={[globals.userCtr]}
                  onValueChange={([value]) => updateGlobal("userCtr", value)}
                  max={10}
                  min={0.1}
                  step={0.1}
                  className="w-full py-2"
                />
                <div className="flex justify-between text-xs text-[#6A6A6A] font-medium">
                  <span>0.1%</span>
                  <span>10%</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold text-[#4A4A4A]">
                  Your Landing Page Conversion:{" "}
                  <span className="text-lg font-bold text-[#1A1A1A]">{globals.userLpConv.toFixed(1)}%</span>
                </Label>
                <Slider
                  value={[globals.userLpConv]}
                  onValueChange={([value]) => updateGlobal("userLpConv", value)}
                  max={15}
                  min={0.5}
                  step={0.1}
                  className="w-full py-2"
                />
                <div className="flex justify-between text-xs text-[#6A6A6A] font-medium">
                  <span>0.5%</span>
                  <span>15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-white border-[#E8E6E3] shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="font-bold text-xl text-[#1A1A1A]">
              Results for {formatCurrency(globals.revenueGoal)} Annual Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-6 bg-[#F9F8F6] rounded-lg border border-[#E8E6E3]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-[#4A4A4A] text-base">
                    Total Customers Needed:{" "}
                    <span className="text-xl font-bold text-[#1A1A1A]">
                      {formatNumber(Math.ceil(globals.revenueGoal / globals.price))}
                    </span>
                  </p>
                  <p className="text-sm text-[#6A6A6A] mt-1">
                    Based on product price of {formatCurrency(globals.price)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#4A4A4A] text-base">
                    Monthly Revenue Target:{" "}
                    <span className="text-xl font-bold text-[#1A1A1A]">{formatCurrency(monthlyRevenue)}</span>
                  </p>
                  <p className="text-sm text-[#6A6A6A] mt-1">Over 12 months</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E8E6E3]">
              <table className="w-full">
                <thead className="bg-[#F9F8F6]">
                  <tr className="border-b border-[#E8E6E3]">
                    <th className="sticky left-0 z-10 bg-[#F9F8F6] text-left p-4 font-bold text-[#1A1A1A] border-r border-[#E8E6E3] min-w-[140px]">
                      Scenario
                    </th>
                    <th className="text-left p-4 font-bold text-[#1A1A1A] min-w-[80px]">CTR %</th>
                    <th className="text-left p-4 font-bold text-[#1A1A1A] min-w-[90px]">LP Conv %</th>
                    <th className="text-left p-4 font-bold text-[#1A1A1A] min-w-[110px]">Overall Conv %</th>
                    <th className="text-left p-4 font-bold text-[#1A1A1A] min-w-[120px]">Views Needed</th>
                    <th className="text-left p-4 font-bold text-[#1A1A1A] min-w-[120px]">Videos Needed</th>
                    <th className="text-left p-4 font-bold text-[#1A1A1A] min-w-[140px]">Release Frequency</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {results.map((result, index) => (
                    <>
                      <tr
                        key={index}
                        className={`border-b border-[#E8E6E3] hover:bg-[#F9F8F6] transition-colors ${
                          result.isUser ? "bg-white border-l-4 border-l-[#D4967A] shadow-sm font-semibold" : ""
                        }`}
                      >
                        <td
                          className={`sticky left-0 z-10 p-4 font-semibold text-[#1A1A1A] border-r border-[#E8E6E3] ${
                            result.isUser ? "bg-white" : "bg-white hover:bg-[#F9F8F6]"
                          } transition-colors`}
                        >
                          {result.scenario}
                        </td>
                        <td className="p-4 font-medium text-[#4A4A4A]">{result.ctr.toFixed(1)}%</td>
                        <td className="p-4 font-medium text-[#4A4A4A]">{result.lpConv.toFixed(1)}%</td>
                        <td className="p-4 font-medium text-[#4A4A4A]">
                          {result.funnelConv === 0 ? "—" : `${(result.funnelConv * 100).toFixed(3)}%`}
                        </td>
                        <td className="p-4 font-medium text-[#4A4A4A]">
                          {result.viewsNeeded === "—" ? "—" : formatNumber(Number(result.viewsNeeded))}
                        </td>
                        <td className="p-4 font-medium text-[#4A4A4A]">
                          {result.videosNeeded === "—" ? "—" : formatNumber(Number(result.videosNeeded))}
                        </td>
                        <td className="p-4 font-medium text-[#4A4A4A]">
                          <span>{result.frequency}</span>
                        </td>
                      </tr>
                      {result.isUser && (
                        <tr className="border-b-2 border-[#D4967A]/40">
                          {/* Mobile: Show in sticky column only */}
                          <td className="sticky left-0 z-10 bg-[#F9F8F6] p-3 text-left text-sm font-semibold text-[#6A6A6A] border-r border-[#E8E6E3] md:hidden">
                            Example Scenarios
                          </td>
                          {/* Desktop: Span all columns */}
                          <td
                            colSpan={7}
                            className="p-3 text-center text-sm font-semibold text-[#6A6A6A] bg-[#F9F8F6] hidden md:table-cell"
                          >
                            Example Scenarios
                          </td>
                          {/* Mobile: Fill remaining columns with invisible content */}
                          <td className="p-3 bg-[#F9F8F6] md:hidden"></td>
                          <td className="p-3 bg-[#F9F8F6] md:hidden"></td>
                          <td className="p-3 bg-[#F9F8F6] md:hidden"></td>
                          <td className="p-3 bg-[#F9F8F6] md:hidden"></td>
                          <td className="p-3 bg-[#F9F8F6] md:hidden"></td>
                          <td className="p-3 bg-[#F9F8F6] md:hidden"></td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Creator Attribution Card */}
        <Card className="bg-white border-[#E8E6E3] shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-[#6A6A6A] font-medium">Created by</span>
                  <button
                    onClick={() => window.open("https://x.com/ChetCallahan", "_blank")}
                    className="font-bold text-[#1A1A1A] text-lg hover:text-[#D4967A] transition-colors cursor-pointer"
                  >
                    Chet Callahan
                  </button>
                </div>
                <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">The Creator MVP Playbook</h3>
                <p className="text-[#4A4A4A] font-medium">
                  Transform your professional experience into a strategic business on YouTube.
                </p>
              </div>
              <Button
                className="bg-[#D4967A] hover:bg-[#C8896E] text-white flex items-center gap-2 whitespace-nowrap font-bold px-6 py-3 text-base shadow-sm hover:shadow-md transition-all"
                onClick={() => window.open("https://www.creator-mvp.com", "_blank")}
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Simple Footer */}
        <div className="text-center py-6 text-sm text-[#6A6A6A] font-medium">
          <p>© 2025 Creators Who Build. Built with 🤍 for creators.</p>
        </div>
      </div>
    </div>
  )
}
