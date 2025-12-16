import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroBg from "@assets/generated_images/subtle_light_tech_grid_background.png";
import heroVisual from "@assets/generated_images/abstract_workflow_automation_visualization.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Building Smarter Processes
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 text-foreground tracking-tight">
            Automate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Chaos.</span> <br />
            Scale Confidence.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            We design intelligent systems that save time, eliminate bottlenecks, and help you focus on growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
              Start Your Automation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full text-lg px-8 py-6 border-2 hover:bg-secondary/5">
              View Our Process
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            {["Operational Efficiency", "AI Integration", "Workflow Optimization"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
             <img 
               src={heroVisual} 
               alt="Workflow Automation Visualization" 
               className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
             />
             {/* Glass overlay card */}
             <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/40 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-sm font-mono text-muted-foreground">System Status</span>
                   <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">OPTIMIZED</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-primary to-secondary"
                     initial={{ width: "0%" }}
                     animate={{ width: "94%" }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                   />
                </div>
                <div className="flex justify-between mt-2 text-xs font-medium">
                  <span>Efficiency Gain</span>
                  <span>+94%</span>
                </div>
             </div>
          </div>
          
          {/* Decorative elements behind */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl z-0" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl z-0" />
        </motion.div>
      </div>
    </section>
  );
}
