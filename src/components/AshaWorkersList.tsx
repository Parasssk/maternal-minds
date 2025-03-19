
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for ASHA workers - in a real app, this would come from an API
const mockAshaWorkers = [
  { id: 1, name: "प्रिया शर्मा", nameEn: "Priya Sharma", area: "सेक्टर 12, दिल्ली", areaEn: "Sector 12, Delhi", phone: "+91 98765 43210", experience: "5 वर्ष", experienceEn: "5 years" },
  { id: 2, name: "लक्ष्मी देवी", nameEn: "Lakshmi Devi", area: "राजीव नगर, मुंबई", areaEn: "Rajiv Nagar, Mumbai", phone: "+91 87654 32109", experience: "8 वर्ष", experienceEn: "8 years" },
  { id: 3, name: "अनीता कुमारी", nameEn: "Anita Kumari", area: "गांधी रोड, कोलकाता", areaEn: "Gandhi Road, Kolkata", phone: "+91 76543 21098", experience: "3 वर्ष", experienceEn: "3 years" },
  { id: 4, name: "सुनीता पटेल", nameEn: "Sunita Patel", area: "शिवाजी नगर, पुणे", areaEn: "Shivaji Nagar, Pune", phone: "+91 65432 10987", experience: "6 वर्ष", experienceEn: "6 years" },
  { id: 5, name: "मीना गुप्ता", nameEn: "Meena Gupta", area: "इंदिरा कॉलोनी, चेन्नई", areaEn: "Indira Colony, Chennai", phone: "+91 54321 09876", experience: "4 वर्ष", experienceEn: "4 years" }
];

interface AshaWorkersListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: string;
}

const AshaWorkersList: React.FC<AshaWorkersListProps> = ({ open, onOpenChange, language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get text based on language
  const getText = (hi: string, en: string) => language === 'hi' ? hi : en;
  
  // Filter workers based on search term
  const filteredWorkers = mockAshaWorkers.filter(worker => {
    const searchName = language === 'hi' ? worker.name.toLowerCase() : worker.nameEn.toLowerCase();
    const searchArea = language === 'hi' ? worker.area.toLowerCase() : worker.areaEn.toLowerCase();
    
    return searchName.includes(searchTerm.toLowerCase()) ||
           searchArea.includes(searchTerm.toLowerCase());
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-health-700">
            {getText("आस-पास के आशा कार्यकर्ता", "Nearby ASHA Workers")}
          </DialogTitle>
          <DialogDescription>
            {getText(
              "मातृ और शिशु स्वास्थ्य सहायता के लिए अपने क्षेत्र में आशा कार्यकर्ताओं को खोजें",
              "Find ASHA workers in your area for maternal and child health support"
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder={getText("नाम या क्षेत्र से खोजें...", "Search by name or area...")}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-1">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map(worker => (
              <div 
                key={worker.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-medium text-health-600">
                  {language === 'hi' ? worker.name : worker.nameEn}
                </h3>
                <div className="mt-2 text-sm grid gap-1">
                  <p className="text-muted-foreground">
                    {getText("क्षेत्र", "Area")}: {language === 'hi' ? worker.area : worker.areaEn}
                  </p>
                  <p className="text-muted-foreground">
                    {getText("फोन", "Phone")}: {worker.phone}
                  </p>
                  <p className="text-muted-foreground">
                    {getText("अनुभव", "Experience")}: {language === 'hi' ? worker.experience : worker.experienceEn}
                  </p>
                </div>
                <button className="mt-3 text-sm text-health-600 hover:text-health-700 font-medium">
                  {getText("अभी संपर्क करें", "Contact Now")}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {getText(
                "आपकी खोज से मेल खाने वाले कोई आशा कार्यकर्ता नहीं मिले।",
                "No ASHA workers found matching your search."
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AshaWorkersList;
