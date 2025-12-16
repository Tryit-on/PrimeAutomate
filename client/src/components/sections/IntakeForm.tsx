import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema definition (simplified for the multi-step flow)
const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  website: z.string().optional(),
  
  businessType: z.string().min(1, "Please select a business type"),
  teamSize: z.string().min(1, "Please select team size"),
  customerChannels: z.array(z.string()).min(1, "Select at least one channel"),
  
  painPoints: z.array(z.string()).min(1, "Select at least one challenge"),
  processesToAutomate: z.array(z.string()).min(1, "Select at least one process"),
  
  mainGoal: z.string().min(1, "Please select a goal"),
  timeline: z.string().min(1, "Please select a timeline"),
  
  tools: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  additionalInfo: z.string().optional(),
  contactMethod: z.string().min(1, "Please select a contact method"),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Business Info" },
  { id: 2, title: "Operations" },
  { id: 3, title: "Pain Points" },
  { id: 4, title: "Goals & Budget" },
];

export function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      businessType: "",
      teamSize: "",
      customerChannels: [],
      painPoints: [],
      processesToAutomate: [],
      mainGoal: "",
      timeline: "",
      tools: "",
      budget: "",
      additionalInfo: "",
      contactMethod: "",
    },
    mode: "onChange", 
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "Assessment Received",
      description: "We'll be in touch shortly with your automation blueprint.",
    });
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "businessName", "email", "phone"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["businessType", "teamSize", "customerChannels"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["painPoints", "processesToAutomate"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: document.getElementById("intake-form")?.offsetTop! - 100, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: document.getElementById("intake-form")?.offsetTop! - 100, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 p-12 rounded-3xl border border-green-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">Thank You! 🎉</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your information has been received. A member of PrimeAutomate Systems will review your responses and follow up shortly with your personalized workflow blueprint.
            </p>
            <Button onClick={() => { setIsSuccess(false); setCurrentStep(1); form.reset(); }} variant="outline">
              Submit Another Response
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Get Your Automation Blueprint
          </h2>
          <p className="text-lg text-muted-foreground">
            This intake form helps us understand your operations so we can design the right system for you.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <span 
                key={step.id} 
                className={`text-sm font-medium ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {step.title}
              </span>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <Card className="border-t-4 border-t-primary shadow-xl">
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold mb-4">Business Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Name</FormLabel>
                              <FormControl><Input placeholder="Acme Corp" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Email</FormLabel>
                              <FormControl><Input placeholder="john@company.com" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website (Optional)</FormLabel>
                            <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold mb-4">Operations Profile</h3>
                      
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>What type of business do you run?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {["Service-based", "Product-based", "Coaching/Consulting", "Local business", "Real estate", "Other"].map((item) => (
                                  <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={item} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Team Size</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {["Just me", "2–5", "6–10", "11–20", "21+"].map((item) => (
                                  <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={item} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="customerChannels"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">How do customers reach you?</FormLabel>
                              <CardDescription>Select all that apply.</CardDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {["WhatsApp", "Email", "Website", "Phone calls", "Social media", "SMS", "In-person"].map((item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="customerChannels"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold mb-4">Pain Points & Needs</h3>
                      
                      <FormField
                        control={form.control}
                        name="painPoints"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Biggest Operational Challenges</FormLabel>
                            </div>
                            <div className="space-y-2">
                              {[
                                "Too much manual admin",
                                "Slow or inconsistent replies",
                                "Missed messages / follow-ups",
                                "Difficulty tracking leads",
                                "Scheduling is a mess",
                                "No clear workflow",
                                "Tasks falling through cracks"
                              ].map((item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="painPoints"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="processesToAutomate"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">What to automate first?</FormLabel>
                            </div>
                            <div className="space-y-2">
                              {[
                                "Customer responses (AI chat)",
                                "Appointment scheduling",
                                "Follow-ups & reminders",
                                "Lead qualification",
                                "Internal workflows",
                                "Reporting",
                                "Invoicing & payments"
                              ].map((item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="processesToAutomate"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold mb-4">Goals & Next Steps</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="mainGoal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Main Goal</FormLabel>
                              <FormControl>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                >
                                  <option value="">Select a goal...</option>
                                  <option value="Save time">Save time</option>
                                  <option value="Reduce workload">Reduce workload</option>
                                  <option value="Scale business">Scale the business</option>
                                  <option value="Improve CX">Improve customer experience</option>
                                  <option value="Increase revenue">Increase revenue</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timeline</FormLabel>
                              <FormControl>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                >
                                  <option value="">When to start?</option>
                                  <option value="Immediately">Immediately</option>
                                  <option value="This week">This week</option>
                                  <option value="This month">This month</option>
                                  <option value="Exploring">Just exploring</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Estimated Budget</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {["Under £1,000", "£1,000–£2,500", "£2,500–£5,000", "£5,000–£15,000", "Need recommendation"].map((item) => (
                                  <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={item} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Anything else we should know?</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell us more about your specific needs..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Contact Method</FormLabel>
                             <FormControl>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                >
                                  <option value="">Select...</option>
                                  <option value="WhatsApp">WhatsApp</option>
                                  <option value="Email">Email</option>
                                  <option value="Phone">Phone</option>
                                  <option value="Zoom">Zoom</option>
                                </select>
                              </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-6 border-t">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                  ) : (
                    <div></div> // Spacer
                  )}
                  
                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep}>
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} className="bg-primary text-white">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        "Submit Assessment"
                      )}
                    </Button>
                  )}
                </div>

              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
