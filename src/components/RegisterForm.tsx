
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 18 && num <= 60;
  }, "Age must be between 18 and 60"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  address: z.string().min(5, "Address must be at least 5 characters"),
  district: z.string().min(2, "District must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  conceiveDate: z.date({
    required_error: "Please select conception date",
  }),
  additionalInfo: z.string().optional(),
  preferredLanguage: z.string()
});

interface RegisterFormProps {
  language: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ language }) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  // Get text based on language
  const getText = (hi: string, en: string) => language === 'hi' ? hi : en;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      phone: "",
      email: "",
      address: "",
      district: "",
      state: "",
      additionalInfo: "",
      preferredLanguage: language === 'hi' ? "Hindi" : "English"
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    
    // In a real application, this data would be sent to a backend service
    toast({
      title: getText("पंजीकरण सफल", "Registration Successful"),
      description: getText(
        "एक आशा कार्यकर्ता जल्द ही आपसे संपर्क करेगी। अपना ख्याल रखें!",
        "An ASHA worker will contact you soon. Take care of yourself!"
      ),
    });
    
    // Close the dialog
    setOpen(false);
    
    // Reset the form
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="btn-health"
          size="lg"
        >
          {getText("गर्भावस्था पंजीकरण", "Register Pregnancy")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {getText("अपनी गर्भावस्था पंजीकृत करें", "Register Your Pregnancy")}
          </DialogTitle>
          <DialogDescription>
            {getText(
              "आशा कार्यकर्ता आपकी गर्भावस्था यात्रा के दौरान उचित देखभाल प्रदान कर सकें, इसलिए अपना विवरण भरें।",
              "Fill in your details so ASHA workers can provide you with proper care during your pregnancy journey."
            )}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getText("पूरा नाम", "Full Name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={getText("अपना पूरा नाम दर्ज करें", "Enter your full name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getText("उम्र", "Age")}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={getText("आपकी उम्र", "Your age")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getText("फोन नंबर", "Phone Number")}</FormLabel>
                    <FormControl>
                      <Input placeholder={getText("आपका संपर्क नंबर", "Your contact number")} {...field} />
                    </FormControl>
                    <FormDescription>
                      {getText(
                        "आशा कार्यकर्ता आपसे संपर्क करने के लिए इसका उपयोग करेंगी",
                        "ASHA workers will use this to contact you"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getText("ईमेल (वैकल्पिक)", "Email (Optional)")}</FormLabel>
                    <FormControl>
                      <Input placeholder={getText("आपका ईमेल पता", "Your email address")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="conceiveDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{getText("अनुमानित गर्भधारण तिथि", "Approximate Conception Date")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{getText("तिथि चुनें", "Select date")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {getText(
                      "यह आपकी अपेक्षित प्रसव तिथि की गणना करने में मदद करता है",
                      "This helps calculate your expected delivery date"
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getText("पता", "Address")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={getText("आपका आवासीय पता", "Your residential address")} 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getText("जिला", "District")}</FormLabel>
                    <FormControl>
                      <Input placeholder={getText("आपका जिला", "Your district")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getText("राज्य", "State")}</FormLabel>
                    <FormControl>
                      <Input placeholder={getText("आपका राज्य", "Your state")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="preferredLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getText("पसंदीदा भाषा", "Preferred Language")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={getText("अपनी पसंदीदा भाषा चुनें", "Select your preferred language")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">हिंदी</SelectItem>
                      <SelectItem value="Tamil">தமிழ்</SelectItem>
                      <SelectItem value="Telugu">తెలుగు</SelectItem>
                      <SelectItem value="Bengali">বাংলা</SelectItem>
                      <SelectItem value="Marathi">मराठी</SelectItem>
                      <SelectItem value="Gujarati">ગુજરાતી</SelectItem>
                      <SelectItem value="Kannada">ಕನ್ನಡ</SelectItem>
                      <SelectItem value="Malayalam">മലയാളം</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {getText(
                      "आशा कार्यकर्ता आपकी पसंदीदा भाषा में संवाद करने का प्रयास करेंगी",
                      "ASHA workers will try to communicate in your preferred language"
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getText("अतिरिक्त जानकारी (वैकल्पिक)", "Additional Information (Optional)")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={getText(
                        "कोई स्वास्थ्य स्थिति, चिंताएं, या जानकारी जिसे आप साझा करना चाहते हैं",
                        "Any health conditions, concerns, or information you'd like to share"
                      )} 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline">{getText("रद्द करें", "Cancel")}</Button>
              </DialogClose>
              <Button type="submit">{getText("पंजीकरण करें", "Register")}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
