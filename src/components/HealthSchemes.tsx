
import React from "react";
import { ArrowUpRight } from "lucide-react";

interface SchemeProps {
  title: string;
  description: string;
  category: "mother" | "child" | "adolescent";
  benefits: string[];
}

const schemes: SchemeProps[] = [
  {
    title: "Janani Suraksha Yojana (JSY)",
    description: "Financial assistance program for pregnant women to encourage institutional deliveries.",
    category: "mother",
    benefits: [
      "Cash incentive for hospital delivery",
      "Free antenatal check-ups",
      "Post-delivery care",
      "Transportation assistance"
    ]
  },
  {
    title: "Pradhan Mantri Matru Vandana Yojana",
    description: "Maternity benefit program providing cash incentives to pregnant and lactating mothers.",
    category: "mother",
    benefits: [
      "Cash benefits of ₹5,000",
      "Wage compensation",
      "Nutritional support",
      "Regular health check-ups"
    ]
  },
  {
    title: "Mission Indradhanush",
    description: "Immunization program to protect children from vaccine-preventable diseases.",
    category: "child",
    benefits: [
      "Free vaccination against 12 diseases",
      "Door-to-door immunization",
      "Tracking of unvaccinated children",
      "Special focus on high-risk areas"
    ]
  },
  {
    title: "Rashtriya Bal Swasthya Karyakram",
    description: "Child health screening and early intervention services for children.",
    category: "child",
    benefits: [
      "Screening for defects at birth",
      "Developmental delays detection",
      "Free treatment for identified ailments",
      "Health records maintenance"
    ]
  },
  {
    title: "Rashtriya Kishor Swasthya Karyakram",
    description: "Adolescent health program focusing on nutrition, mental health, and more.",
    category: "adolescent",
    benefits: [
      "Nutrition counseling and support",
      "Mental health services",
      "Sexual and reproductive health guidance",
      "Life skills education"
    ]
  },
  {
    title: "Ayushman Bharat",
    description: "Health insurance scheme providing coverage to vulnerable families.",
    category: "mother",
    benefits: [
      "Coverage up to ₹5 lakhs per family",
      "Cashless treatment",
      "Pre and post-hospitalization expenses",
      "No restriction on family size"
    ]
  }
];

const SchemeCard: React.FC<{ scheme: SchemeProps }> = ({ scheme }) => {
  const categoryColors = {
    mother: "bg-mother-50 border-mother-200 hover:border-mother-300",
    child: "bg-child-50 border-child-200 hover:border-child-300",
    adolescent: "bg-health-50 border-health-200 hover:border-health-300"
  };

  const categoryChip = {
    mother: "chip-mother",
    child: "chip-child",
    adolescent: "chip-health"
  };

  return (
    <div className={`rounded-xl p-6 border card-hover transition-all duration-300 ${categoryColors[scheme.category]}`}>
      <div className="flex justify-between items-start mb-3">
        <span className={categoryChip[scheme.category]}>
          {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)} Health
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{scheme.title}</h3>
      <p className="text-foreground/70 mb-4 text-sm">{scheme.description}</p>
      
      <h4 className="text-sm font-medium mb-2">Key Benefits</h4>
      <ul className="space-y-1 mb-4">
        {scheme.benefits.map((benefit, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
            {benefit}
          </li>
        ))}
      </ul>
      
      <button className="text-sm font-medium text-primary flex items-center mt-auto hover:underline">
        Learn more <ArrowUpRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

const HealthSchemes: React.FC = () => {
  return (
    <section id="schemes" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="chip-primary mb-2">Government Support</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Health Schemes</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover government schemes and programs designed to support maternal, 
            child, and adolescent health across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} scheme={scheme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthSchemes;
