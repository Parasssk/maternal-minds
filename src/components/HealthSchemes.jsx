import React from 'react';
import { ExternalLink } from 'lucide-react';

const schemes = [
  {
    title: "Janani Suraksha Yojana (JSY)",
    description: "Cash assistance to pregnant women for institutional delivery",
    category: "mother",
    benefits: [
      "Cash incentive for hospital delivery",
      "Free medical care during delivery",
      "Transportation support"
    ]
  },
  {
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    description: "Maternity benefit program for pregnant and lactating mothers",
    category: "mother",
    benefits: [
      "₹5,000 financial assistance",
      "Direct benefit transfer",
      "Nutritional support"
    ]
  },
  {
    title: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    description: "Early identification and intervention for health conditions in children",
    category: "child",
    benefits: [
      "Free health screening",
      "Treatment for identified conditions",
      "Follow-up care"
    ]
  },
  {
    title: "Integrated Child Development Services (ICDS)",
    description: "Comprehensive program for child development and mother care",
    category: "child",
    benefits: [
      "Supplementary nutrition",
      "Pre-school education",
      "Health checkups"
    ]
  },
  {
    title: "Rashtriya Kishor Swasthya Karyakram (RKSK)",
    description: "Adolescent health program focusing on overall development",
    category: "adolescent",
    benefits: [
      "Health education",
      "Counseling services",
      "Nutrition guidance"
    ]
  },
  {
    title: "Weekly Iron Folic Acid Supplementation (WIFS)",
    description: "Prevention of anemia among adolescents",
    category: "adolescent",
    benefits: [
      "Free iron tablets",
      "Regular monitoring",
      "Health education"
    ]
  }
];

const SchemeCard = ({ scheme }) => {
  const getCategoryColor = (category) => {
    const colors = {
      mother: 'chip-mother',
      child: 'chip-child', 
      adolescent: 'chip-health'
    };
    return colors[category] || 'chip-primary';
  };

  return (
    <div className="bg-card rounded-xl border p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={`${getCategoryColor(scheme.category)}`}>
          {scheme.category}
        </div>
        <ExternalLink size={20} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">
        {scheme.title}
      </h3>
      
      <p className="text-muted-foreground mb-4">
        {scheme.description}
      </p>
      
      <div className="space-y-2">
        <h4 className="font-medium text-card-foreground">Key Benefits:</h4>
        <ul className="space-y-1">
          {scheme.benefits.map((benefit, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      
      <button className="btn-outline mt-4 w-full">
        Learn more
      </button>
    </div>
  );
};

const HealthSchemes = () => {
  return (
    <section id="schemes" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Government Health Schemes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover various government initiatives supporting maternal, child, and adolescent health
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} scheme={scheme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthSchemes;