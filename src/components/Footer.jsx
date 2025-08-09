import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart size={16} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">RMNCHA</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your trusted companion for maternal and child health guidance, connecting families with essential healthcare resources.
            </p>
            <div className="flex space-x-3">
              <Facebook size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors">Chat Assistant</Link></li>
              <li><Link to="/schemes" className="text-muted-foreground hover:text-primary transition-colors">Health Schemes</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">ASHA Workers</a></li>
            </ul>
          </div>

          {/* Health Topics */}
          <div>
            <h3 className="font-semibold mb-4">Health Topics</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pregnancy Care</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Child Nutrition</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Immunization</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Adolescent Health</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">help@rmncha.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Ministry of Health, New Delhi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 RMNCHA Health Assistant. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;