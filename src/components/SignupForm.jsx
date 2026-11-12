import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormLoadingOverlay } from '@/components/FormLoadingOverlay';
import { cn } from '@/lib/utils';

function SignupForm({ isLoading = false, ...props }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background px-4 overflow-hidden sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <Card
          className={cn(
            'w-full border-border/60 shadow-lg transition-all duration-700 ease-in-out',
            isLoading && 'pointer-events-none scale-[0.96] opacity-0'
          )}
        >
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">{props.title}</CardTitle>
            <CardDescription>Sign <i className="fa fa-upload" aria-hidden="true"></i> to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={props.handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="username" className="text-sm font-medium leading-none">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={props.username}
                    onChange={(e) => props.setUsername(e.target.value)}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                    placeholder="Username"
                    required
                  />
                  <Label htmlFor="email" className="text-sm font-medium leading-none">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                    placeholder="Email"
                    required
                  />
                  <Label htmlFor="password" className="text-sm font-medium leading-none">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={props.password}
                    onChange={(e) => props.setPassword(e.target.value)}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="full_name" className="text-sm font-medium leading-none">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={props.full_name}
                    onChange={(e) => props.setFullName(e.target.value)}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                    placeholder="Full Name"
                    required
                  />
                  {props.showAddress && (
                    <Label htmlFor="address" className="text-sm font-medium leading-none">
                      Address
                    </Label>
                  )}
                  {props.showAddress && (
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={props.address}
                      onChange={(e) => props.setAddress(e.target.value)}
                      className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                      placeholder="Address"
                      required
                    />
                  )}
                  <Label htmlFor="phone_number" className="text-sm font-medium leading-none">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={props.phone_number}
                    onChange={(e) => props.setPhoneNumber(e.target.value)}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                    placeholder="Phone Number"
                    required
                  />
                  {props.showVehicleType && (
                    <Label htmlFor="vehicle_type" className="text-sm font-medium leading-none">
                      Vehicle Type
                    </Label>
                  )}
                  {props.showVehicleType && (
                    <Input
                      type="text"
                      id="vehicle_type"
                      name="vehicle_type"
                      value={props.vehicle_type}
                      onChange={(e) => props.setVehicleType(e.target.value)}
                      className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none border rounded-md shadow-sm"
                      placeholder="Vehicle Type"
                      required
                    />
                  )}
                </div>
              </div>
              <CardFooter className="flex-col gap-2 p-0 pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing up...' : 'Sign Up'}
                </Button>
              </CardFooter>
              {props.error && (
                <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <Badge variant="destructive">
                  <span aria-hidden="true">⚠</span>
                  <span>{props.error}</span>
                  </Badge>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        {isLoading && <FormLoadingOverlay text="LOADING" />}
      </div>
    </div>
  );
}

export default SignupForm;
