import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-wider text-primary uppercase mb-2">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Founded by operational experts, driven by technology.
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              PrimeAutomate Systems was founded by Joseph Fadero, a systems-driven Aviation Production Planner with 20+ years of experience in planning, operational efficiency, and cross-functional coordination.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We don't just create systems — we build solutions that transform how businesses work. Our mission is to design intelligent systems that save time, eliminate bottlenecks, and improve service delivery.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Efficiency First", desc: "Systems that save time and reduce chaos." },
                { title: "Simplicity Wins", desc: "No complicated tools. Clear workflows." },
                { title: "Reliability", desc: "Consistent results, consistent processes." },
                { title: "Innovation", desc: "Modern automation for traditional problems." }
              ].map((value, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-xl border border-border">
              <h4 className="text-xl font-heading font-bold mb-6 border-b pb-4">Who We Serve</h4>
              <ul className="space-y-4">
                {[
                  "Businesses looking to improve efficiencies",
                  "Startups needing to scale without increasing workload",
                  "Teams wanting to systemize daily operations",
                  "Companies aiming to deliver consistent, high-quality service",
                  "Organizations ready to adopt AI and digital systems"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-primary font-medium italic text-center">
                  "Our approach combines structured operational thinking with modern automation technology."
                </p>
              </div>
            </div>
            
            {/* Abstract Shapes behind */}
            <div className="absolute top-10 -right-10 w-full h-full bg-secondary/5 rounded-2xl -z-10 transform rotate-3" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
