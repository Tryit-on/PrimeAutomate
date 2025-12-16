import { motion } from "framer-motion";
import { Check, Settings, Zap, Users, Lightbulb } from "lucide-react";

export function Process() {
  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery & Audit",
      description: "We analyze your current operations, identify bottlenecks, and map out your ideal workflow."
    },
    {
      icon: Settings,
      title: "System Design",
      description: "We engineer a custom automation blueprint tailored to your specific business needs and goals."
    },
    {
      icon: Zap,
      title: "Implementation",
      description: "We build, test, and deploy your new automated systems with minimal disruption to your daily operations."
    },
    {
      icon: Users,
      title: "Training & Handoff",
      description: "We ensure your team knows exactly how to use the new tools and provide documentation for the future."
    }
  ];

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-primary uppercase mb-2">Our Process</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Why It Works
          </h3>
          <p className="text-lg text-muted-foreground">
            Our approach combines structured operational thinking with modern automation technology to deliver consistent results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10"
            >
              <div className="bg-white p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm relative">
                  <step.icon className="h-7 w-7 text-primary" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    {index + 1}
                  </div>
                </div>
                
                <h4 className="text-xl font-heading font-bold mb-3">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-8 items-center bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ready to transform your business?
            </h3>
            <p className="text-slate-300 mb-0">
              Stop drowning in manual tasks. Let's build a system that works for you, so you can focus on what truly matters.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col gap-4">
            {[
              "Reduce manual workload",
              "Eliminate bottlenecks",
              "Scale with confidence"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
