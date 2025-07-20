import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="mb-8 text-center"></div>
      <div className="flex gap-6 mb-10">
        <Link to="/signup/customer" className="no-underline text-foreground">
          <Card className="w-[220px] text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            <CardHeader className="p-6">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f4ecec" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus-icon lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
              </div>
              <CardTitle className="text-xl font-semibold text-foreground">Sign up</CardTitle>
              <CardDescription className="text-muted-foreground">Click here as Customer </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/login" className="no-underline text-foreground">
          <Card className="w-[220px] text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            <CardHeader className="p-6">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f4ecec" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in-icon lucide-log-in"><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></svg>
              </div>
              <CardTitle className="text-xl font-semibold text-foreground">Login</CardTitle>
              <CardDescription className="text-muted-foreground">Click here to login</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/signup/driver" className="no-underline text-foreground">
          <Card className="w-[220px] text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            <CardHeader className="p-6">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f4ecec" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck-icon lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
              </div>
              <CardTitle className="text-xl font-semibold text-foreground">Sign up</CardTitle>
              <CardDescription className="text-muted-foreground">Click here as driver</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
