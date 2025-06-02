import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  
  if (session) {
    redirect("/dashboard");
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900">Your App</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-teal-600 transition-colors">Features</Link>
              <Link href="/about" className="text-gray-600 hover:text-teal-600 transition-colors">About</Link>
              <Link href="/support" className="text-gray-600 hover:text-teal-600 transition-colors">Support</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:pr-8">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                All your{" "}
                <span className="text-blue-600">productivity</span>
                {" "}needs under{" "}
                <span className="text-teal-500">1hat!</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Manage your workflow effortlessly with our comprehensive platform.{" "}
                <strong className="text-blue-600">Personalised experience</strong>,{" "}
                <strong className="text-blue-600">Secure cloud storage</strong>, and{" "}
                <strong className="text-blue-600">Direct team collaboration</strong>{" "}
                using our intuitive interface.
              </p>
              
              <p className="text-gray-500 mb-8">
                Download the app and sign in with your credentials to get started!
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/auth"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                  Web Dashboard
                </Link>
                
                <Link 
                  href="/mobile"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                  </svg>
                  Mobile App
                </Link>
              </div>
              
              {/* Feature Points */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure</h3>
                  <p className="text-sm text-gray-600">Bank-grade security</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast</h3>
                  <p className="text-sm text-gray-600">Lightning performance</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Collaborative</h3>
                  <p className="text-sm text-gray-600">Team-focused tools</p>
                </div>
              </div>
            </div>
            
            {/* Right Content - Mock Dashboard */}
            <div className="relative lg:pl-8">
              <div className="relative">
                {/* Background Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-500 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl transform -rotate-2 opacity-20"></div>
                
                {/* Main Dashboard Mock */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold">Dashboard</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-teal-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-teal-600 font-medium">Active Tasks</span>
                          <div className="w-8 h-8 bg-teal-500 rounded-lg"></div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">24</div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-blue-600 font-medium">Completed</span>
                          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">89</div>
                      </div>
                    </div>
                    
                    {/* Mock List Items */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile App Mock */}
                <div className="absolute -bottom-6 -right-6 w-32 h-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-16 flex items-center justify-center">
                    <div className="w-16 h-1 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="h-8 bg-teal-100 rounded"></div>
                      <div className="h-8 bg-blue-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Streamline Your Workflow
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who trust our platform for their daily productivity needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/auth"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <p className="text-blue-200 text-sm">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}