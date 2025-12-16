import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_hexagon_circuit_logo_blue_purple_gradient.png";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <a className="flex items-center gap-3 mb-6">
                 <img
                    src={logoImage}
                    alt="PrimeAutomate Systems"
                    className="h-8 w-8 object-contain brightness-0 invert"
                  />
                <span className="font-heading font-bold text-2xl text-white tracking-tight">
                  PrimeAutomate
                </span>
              </a>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              Building smarter processes for smarter businesses. We design intelligent systems that save time, eliminate bottlenecks, and help you scale with confidence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">AI Workflow Automation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CRM & Customer Journey</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom AI Agents</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Process Re-Engineering</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Transformation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <span>hello@primeautomate.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <span>+44 (0) 20 1234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} PrimeAutomate Systems. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
