import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const countries = [
  { code: 'ar', name: 'Argentina', phoneCode: '+54', format: '+54 XX XXXX XXXX' },
  { code: 'au', name: 'Australia', phoneCode: '+61', format: '+61 X XXXX XXXX' },
  { code: 'at', name: 'Austria', phoneCode: '+43', format: '+43 XXX XXXXXXX' },
  { code: 'bb', name: 'Barbados', phoneCode: '+1', format: '+1 XXX XXX XXXX' },
  { code: 'by', name: 'Belarus', phoneCode: '+375', format: '+375 XX XXX XX XX' },
  { code: 'be', name: 'Belgium', phoneCode: '+32', format: '+32 XXX XX XX XX' },
  { code: 'bo', name: 'Bolivia', phoneCode: '+591', format: '+591 X XXX XXXX' },
  { code: 'br', name: 'Brazil', phoneCode: '+55', format: '+55 XX XXXXX XXXX' },
  { code: 'bg', name: 'Bulgaria', phoneCode: '+359', format: '+359 XX XXX XXXX' },
  { code: 'ca', name: 'Canada', phoneCode: '+1', format: '+1 (XXX) XXX-XXXX' },
  { code: 'cl', name: 'Chile', phoneCode: '+56', format: '+56 X XXXX XXXX' },
  { code: 'cn', name: 'China', phoneCode: '+86', format: '+86 XXX XXXX XXXX' },
  { code: 'co', name: 'Colombia', phoneCode: '+57', format: '+57 XXX XXX XXXX' },
  { code: 'cr', name: 'Costa Rica', phoneCode: '+506', format: '+506 XXXX XXXX' },
  { code: 'hr', name: 'Croatia', phoneCode: '+385', format: '+385 XX XXX XXXX' },
  { code: 'cu', name: 'Cuba', phoneCode: '+53', format: '+53 X XXX XXXX' },
  { code: 'cy', name: 'Cyprus', phoneCode: '+357', format: '+357 XX XXX XXX' },
  { code: 'cz', name: 'Czech Republic', phoneCode: '+420', format: '+420 XXX XXX XXX' },
  { code: 'dk', name: 'Denmark', phoneCode: '+45', format: '+45 XX XX XX XX' },
  { code: 'do', name: 'Dominican Republic', phoneCode: '+1', format: '+1 XXX XXX XXXX' },
  { code: 'ec', name: 'Ecuador', phoneCode: '+593', format: '+593 XX XXX XXXX' },
  { code: 'eg', name: 'Egypt', phoneCode: '+20', format: '+20 XX XXXX XXXX' },
  { code: 'ee', name: 'Estonia', phoneCode: '+372', format: '+372 XXXX XXXX' },
  { code: 'fi', name: 'Finland', phoneCode: '+358', format: '+358 XX XXX XXXX' },
  { code: 'fr', name: 'France', phoneCode: '+33', format: '+33 X XX XX XX XX' },
  { code: 'de', name: 'Germany', phoneCode: '+49', format: '+49 XXX XXXXXXXX' },
  { code: 'gr', name: 'Greece', phoneCode: '+30', format: '+30 XXX XXX XXXX' },
  { code: 'gt', name: 'Guatemala', phoneCode: '+502', format: '+502 XXXX XXXX' },
  { code: 'hk', name: 'Hong Kong', phoneCode: '+852', format: '+852 XXXX XXXX' },
  { code: 'hu', name: 'Hungary', phoneCode: '+36', format: '+36 XX XXX XXXX' },
  { code: 'is', name: 'Iceland', phoneCode: '+354', format: '+354 XXX XXXX' },
  { code: 'in', name: 'India', phoneCode: '+91', format: '+91 XXXXX XXXXX' },
  { code: 'id', name: 'Indonesia', phoneCode: '+62', format: '+62 XXX XXXX XXXX' },
  { code: 'ie', name: 'Ireland', phoneCode: '+353', format: '+353 XX XXX XXXX' },
  { code: 'il', name: 'Israel', phoneCode: '+972', format: '+972 XX XXX XXXX' },
  { code: 'it', name: 'Italy', phoneCode: '+39', format: '+39 XXX XXX XXXX' },
  { code: 'jm', name: 'Jamaica', phoneCode: '+1', format: '+1 XXX XXX XXXX' },
  { code: 'jp', name: 'Japan', phoneCode: '+81', format: '+81 XX XXXX XXXX' },
  { code: 'ke', name: 'Kenya', phoneCode: '+254', format: '+254 XXX XXXXXX' },
  { code: 'kw', name: 'Kuwait', phoneCode: '+965', format: '+965 XXXX XXXX' },
  { code: 'lv', name: 'Latvia', phoneCode: '+371', format: '+371 XXXX XXXX' },
  { code: 'lt', name: 'Lithuania', phoneCode: '+370', format: '+370 XXX XXXXX' },
  { code: 'lu', name: 'Luxembourg', phoneCode: '+352', format: '+352 XXX XXX XXX' },
  { code: 'my', name: 'Malaysia', phoneCode: '+60', format: '+60 XX XXXX XXXX' },
  { code: 'mt', name: 'Malta', phoneCode: '+356', format: '+356 XXXX XXXX' },
  { code: 'mx', name: 'Mexico', phoneCode: '+52', format: '+52 XXX XXX XXXX' },
  { code: 'md', name: 'Moldova', phoneCode: '+373', format: '+373 XX XXX XXX' },
  { code: 'ma', name: 'Morocco', phoneCode: '+212', format: '+212 XXX XXXXXX' },
  { code: 'nl', name: 'Netherlands', phoneCode: '+31', format: '+31 X XXXX XXXX' },
  { code: 'nz', name: 'New Zealand', phoneCode: '+64', format: '+64 XX XXX XXXX' },
  { code: 'ng', name: 'Nigeria', phoneCode: '+234', format: '+234 XXX XXX XXXX' },
  { code: 'no', name: 'Norway', phoneCode: '+47', format: '+47 XXXX XXXX' },
  { code: 'pa', name: 'Panama', phoneCode: '+507', format: '+507 XXXX XXXX' },
  { code: 'py', name: 'Paraguay', phoneCode: '+595', format: '+595 XXX XXXXXX' },
  { code: 'pe', name: 'Peru', phoneCode: '+51', format: '+51 XXX XXX XXX' },
  { code: 'ph', name: 'Philippines', phoneCode: '+63', format: '+63 XXX XXX XXXX' },
  { code: 'pl', name: 'Poland', phoneCode: '+48', format: '+48 XXX XXX XXX' },
  { code: 'pt', name: 'Portugal', phoneCode: '+351', format: '+351 XXX XXX XXX' },
  { code: 'qa', name: 'Qatar', phoneCode: '+974', format: '+974 XXXX XXXX' },
  { code: 'ro', name: 'Romania', phoneCode: '+40', format: '+40 XXX XXX XXX' },
  { code: 'ru', name: 'Russia', phoneCode: '+7', format: '+7 XXX XXX XX XX' },
  { code: 'sa', name: 'Saudi Arabia', phoneCode: '+966', format: '+966 XX XXX XXXX' },
  { code: 'sg', name: 'Singapore', phoneCode: '+65', format: '+65 XXXX XXXX' },
  { code: 'sk', name: 'Slovakia', phoneCode: '+421', format: '+421 XXX XXX XXX' },
  { code: 'si', name: 'Slovenia', phoneCode: '+386', format: '+386 XX XXX XXX' },
  { code: 'za', name: 'South Africa', phoneCode: '+27', format: '+27 XX XXX XXXX' },
  { code: 'kr', name: 'South Korea', phoneCode: '+82', format: '+82 XX XXXX XXXX' },
  { code: 'es', name: 'Spain', phoneCode: '+34', format: '+34 XXX XXX XXX' },
  { code: 'se', name: 'Sweden', phoneCode: '+46', format: '+46 XX XXX XX XX' },
  { code: 'ch', name: 'Switzerland', phoneCode: '+41', format: '+41 XX XXX XX XX' },
  { code: 'tw', name: 'Taiwan', phoneCode: '+886', format: '+886 XXX XXX XXX' },
  { code: 'th', name: 'Thailand', phoneCode: '+66', format: '+66 XX XXX XXXX' },
  { code: 'tt', name: 'Trinidad and Tobago', phoneCode: '+1', format: '+1 XXX XXX XXXX' },
  { code: 'tr', name: 'Turkey', phoneCode: '+90', format: '+90 XXX XXX XX XX' },
  { code: 'ua', name: 'Ukraine', phoneCode: '+380', format: '+380 XX XXX XX XX' },
  { code: 'ae', name: 'United Arab Emirates', phoneCode: '+971', format: '+971 XX XXX XXXX' },
  { code: 'gb', name: 'United Kingdom', phoneCode: '+44', format: '+44 XXXX XXXXXX' },
  { code: 'us', name: 'United States', phoneCode: '+1', format: '+1 (XXX) XXX-XXXX' },
  { code: 'uy', name: 'Uruguay', phoneCode: '+598', format: '+598 XXXX XXXX' },
  { code: 've', name: 'Venezuela', phoneCode: '+58', format: '+58 XXX XXX XXXX' },
  { code: 'vn', name: 'Vietnam', phoneCode: '+84', format: '+84 XX XXXX XXXX' },
];

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const currentCountry = countries.find(country => country.code === selectedCountry);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setPhoneNumber(country.phoneCode + ' ');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (currentCountry) {
      if (!value.startsWith(currentCountry.phoneCode)) {
        setPhoneNumber(currentCountry.phoneCode + ' ');
      } else {
        setPhoneNumber(value);
      }
    } else {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="min-h-screen bg-forex-dark flex items-center justify-center relative overflow-hidden py-8">
      <div className="absolute inset-0 forex-network-animation"></div>
      
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-white/80 hover:text-forex-cyan transition-colors flex items-center gap-2 z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="absolute top-6 right-6 flex items-center space-x-2 z-20">
        <div className="w-8 h-8 bg-forex-cyan rounded transform rotate-45"></div>
        <span className="text-xl font-bold text-white">
          MEGA FX<br />
          <span className="text-sm">MARKET</span>
        </span>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        <Card className="forex-card-gradient border-forex-cyan/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-white mb-2">Join Mega FX Market</CardTitle>
            <p className="text-white/70">Start your trading journey with us</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white text-sm font-medium">
                    First Name
                  </Label>
                  <Input 
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white text-sm font-medium">
                    Last Name
                  </Label>
                  <Input 
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  Email Address
                </Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={currentCountry ? currentCountry.format : "+1 (555) 123-4567"}
                  className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-11"
                />
                {currentCountry && (
                  <p className="text-xs text-white/60">
                    Format: {currentCountry.format}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-white text-sm font-medium">
                  Country
                </Label>
                <Select onValueChange={handleCountryChange} value={selectedCountry}>
                  <SelectTrigger className="bg-forex-dark-100 border-forex-cyan/30 text-white h-11">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-forex-dark-100 border-forex-cyan/30 text-white max-h-48 overflow-y-auto">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name} ({country.phoneCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-white text-sm font-medium">
                  Trading Experience
                </Label>
                <Select>
                  <SelectTrigger className="bg-forex-dark-100 border-forex-cyan/30 text-white h-11">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-forex-dark-100 border-forex-cyan/30 text-white">
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                    <SelectItem value="professional">Professional Trader</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-11 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-forex-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-11 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-forex-cyan transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-forex-dark-100/50 p-4 rounded-lg border border-forex-cyan/20">
                <p className="text-white/70 text-sm mb-2">Password must contain:</p>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-forex-cyan mr-2" />
                    At least 8 characters
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-forex-cyan mr-2" />
                    One uppercase letter
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-forex-cyan mr-2" />
                    One number
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-forex-cyan mr-2" />
                    One special character
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-3 text-sm text-white/70">
                  <input 
                    type="checkbox" 
                    className="mt-1 rounded border-forex-cyan/30 bg-forex-dark-100 text-forex-cyan focus:ring-forex-cyan"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">Privacy Policy</a>
                  </span>
                </label>

                <label className="flex items-start space-x-3 text-sm text-white/70">
                  <input 
                    type="checkbox" 
                    className="mt-1 rounded border-forex-cyan/30 bg-forex-dark-100 text-forex-cyan focus:ring-forex-cyan"
                  />
                  <span>
                    I confirm that I am at least 18 years old and understand the risks of trading
                  </span>
                </label>

                <label className="flex items-start space-x-3 text-sm text-white/70">
                  <input 
                    type="checkbox" 
                    className="mt-1 rounded border-forex-cyan/30 bg-forex-dark-100 text-forex-cyan focus:ring-forex-cyan"
                  />
                  <span>
                    I would like to receive updates and promotional emails from Mega FX Market
                  </span>
                </label>
              </div>

              <Button className="forex-btn-primary w-full h-12 text-lg font-semibold">
                Create Account
              </Button>
            </form>


            <div className="text-center pt-4">
              <p className="text-white/70">
                Already have an account?{' '}
                <Link to="/login" className="text-forex-cyan hover:text-forex-cyan/80 font-semibold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
