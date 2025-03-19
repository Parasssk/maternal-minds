
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

// Mock data for ASHA workers - in a real app, this would come from an API
const mockAshaWorkers = [
  { id: 1, name: "Priya Sharma", area: "Sector 12, Delhi", phone: "+91 98765 43210", experience: "5 years" },
  { id: 2, name: "Lakshmi Devi", area: "Rajiv Nagar, Mumbai", phone: "+91 87654 32109", experience: "8 years" },
  { id: 3, name: "Anita Kumari", area: "Gandhi Road, Kolkata", phone: "+91 76543 21098", experience: "3 years" },
  { id: 4, name: "Sunita Patel", area: "Shivaji Nagar, Pune", phone: "+91 65432 10987", experience: "6 years" },
  { id: 5, name: "Meena Gupta", area: "Indira Colony, Chennai", phone: "+91 54321 09876", experience: "4 years" }
];

interface AshaWorkersListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AshaWorkersList: React.FC<AshaWorkersListProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter workers based on search term
  const filteredWorkers = mockAshaWorkers.filter(worker => 
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-health-700">Nearby ASHA Workers</DialogTitle>
          <DialogDescription>
            Find ASHA workers in your area for maternal and child health support
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search by name or area..."
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
                <h3 className="font-medium text-health-600">{worker.name}</h3>
                <div className="mt-2 text-sm grid gap-1">
                  <p className="text-muted-foreground">Area: {worker.area}</p>
                  <p className="text-muted-foreground">Phone: {worker.phone}</p>
                  <p className="text-muted-foreground">Experience: {worker.experience}</p>
                </div>
                <button className="mt-3 text-sm text-health-600 hover:text-health-700 font-medium">
                  Contact Now
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No ASHA workers found matching your search.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AshaWorkersList;
