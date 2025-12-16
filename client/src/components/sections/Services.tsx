import { 
  Bot, 
  Workflow, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  FileText 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    description: "Smart systems that automate daily operations — customer support, scheduling, follow-ups, reminders, and more.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: BarChart3,
    title: "CRM & Customer Journey",
    description: "Automated pipelines, lead routing, onboarding, communication, and retention systems.",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    icon: Bot,
    title: "Custom AI Assistants",
    description: "AI-powered agents for WhatsApp, websites, email, and support that work 24/7.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    icon: Zap,
    title: "Operational Re-Engineering",
    description: "Identifying bottlenecks, redesigning workflows, and optimizing how your business runs.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    icon: MessageSquare,
    title: "Digital Transformation",
    description: "Helping businesses adopt automation and eliminate manual, repetitive processes.",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: FileText,
    title: "SOP & Systemisation",
    description: "Documenting processes and building scalable business playbooks for consistency.",
    color: "text-rose-600",
    bg: "bg-rose-50"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground">
            We blend deep operational insight with modern AI automation technology to transform how businesses work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group bg-slate-50/50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
