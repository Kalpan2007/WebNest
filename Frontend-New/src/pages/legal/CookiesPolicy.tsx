import { ScrollArea } from '@/components/ui/scroll-area';
import { Cookie, Shield, Book, Clock, TrendingUp, TrendingDown, Sparkles, CircleDot, ArrowRight, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { Link } from 'react-router-dom'

export function CookiesPolicy() {
  const [activeSection, setActiveSection] = useState('1');

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
    { title: 'Help', href: '/help' },
    { title: 'Cookies Policy', href: '/cookies' },
  ]

  const footerSections = [
    {
      title: 'Services',
      links: [
        { title: 'Web Development', href: '/services/web' },
        { title: 'E-commerce', href: '/services/ecommerce' },
        { title: 'Mobile Apps', href: '/services/mobile' },
        { title: 'Consulting', href: '/services/consulting' },
      ]
    },
    {
      title: 'Company',
      links: [
        { title: 'About Us', href: '/about' },
        { title: 'Portfolio', href: '/portfolio' },
        { title: 'Careers', href: '/careers' },
        { title: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { title: 'Help Center', href: '/help' },
        { title: 'Documentation', href: '/doc' },
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
      ]
    },
  ]

  return (
    <div className="" >
      <Navbar
        logo={
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-1 rounded-xl bg-gradient-to-br from-primary to-accent shadow-soft">
              <img
                src="/logo.png"
                alt="WebNest Icon"
                className="h-8 w-8 object-cover rounded-sm"
              />
            </div>
            <span className="text-2xl font-bold text-gradient">WebNest</span>
          </Link>
        }
        items={navItems}
        actions={
          <>
            <Link to="/auth">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button variant="gradient" size="sm">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        }
      />

      <div className="container mx-auto py-8 px-4 max-w-4xl bg-white rounded-2xl shadow-lg">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-2xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Cookie className="h-8 w-8 mr-2" />
              <h1 className="text-4xl font-bold mb-2">Cookies Policy</h1>
              <p className="text-lg">Last Updated: July 24, 2025</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-white/10 text-white">
                <Sparkles className="h-4 w-4 mr-2" /> Version 2.0
              </Badge>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="flex items-center justify-between mb-8">
                <Badge variant="outline" className="bg-white/10 text-white">
                  <Clock className="h-4 w-4 mr-2" /> Effective: July 24, 2025
                </Badge>
              </div>

              {/* Table of Contents */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                  <li><a href="#what-are-cookies" className="text-[#8b70cd] hover:text-[#aa96da]">What are Cookies?</a></li>
                  <li><a href="#types-of-cookies" className="text-[#8b70cd] hover:text-[#aa96da]">Types of Cookies</a></li>
                  <li><a href="#how-we-use-cookies" className="text-[#8b70cd] hover:text-[#aa96da]">How We Use Cookies</a></li>
                  <li><a href="#your-cookie-choices" className="text-[#8b70cd] hover:text-[#aa96da]">Your Cookie Choices</a></li>
                  <li><a href="#changes-to-this-policy" className="text-[#8b70cd] hover:text-[#aa96da]">Changes to This Policy</a></li>
                </ul>
              </div>

              {/* Main Content */}
              <div className="space-y-8">
                <section id="what-are-cookies">
                  <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
                  <p className="text-gray-600">
                    Cookies are small text files that are stored on your device when you visit a website.
                    They help websites remember information about your visit and improve your browsing
                    experience. Cookies can be either session cookies (which expire when you close your
                    browser) or persistent cookies (which remain on your device until they expire or are
                    deleted).
                  </p>
                </section>

                <section id="types-of-cookies">
                  <h2 className="text-2xl font-semibold mb-4">Types of Cookies</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                      <p className="text-gray-600">
                        These cookies are necessary for the website to function and cannot be turned off.
                        They are typically only set in response to actions made by you that amount to a
                        request for services, such as setting your privacy preferences, logging in, or
                        filling in forms.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
                      <p className="text-gray-600">
                        These cookies allow us to count visits and traffic sources so we can measure and
                        improve the performance of our site. They help us know which pages are the most
                        and least popular and see how visitors move around the site.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Functional Cookies</h3>
                      <p className="text-gray-600">
                        These cookies enable the website to provide enhanced functionality and
                        personalization. They may be set by us or by third-party providers whose services
                        we have added to our pages. If you do not allow these cookies, then some or all of
                        these services may not function properly.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="how-we-use-cookies">
                  <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      We use cookies to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Remember your preferences and settings</li>
                      <li>Track your interactions with our site</li>
                      <li>Analyze how you use our services</li>
                      <li>Provide personalized content and recommendations</li>
                      <li>Prevent fraud and protect your account</li>
                    </ul>
                  </div>
                </section>

                <section id="your-cookie-choices">
                  <h2 className="text-2xl font-semibold mb-4">Your Cookie Choices</h2>
                  <p className="text-gray-600">
                    You can control and manage cookies through your browser settings. Most browsers allow
                    you to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Block cookies</li>
                    <li>Delete cookies</li>
                    <li>Accept or reject specific types of cookies</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    Please note that blocking cookies may affect the functionality of our website.
                  </p>
                </section>

                <section id="changes-to-this-policy">
                  <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                  <p className="text-gray-600">
                    We may update our Cookie Policy from time to time. We will notify you of any changes
                    by posting the new Cookie Policy on this page and updating the "Effective" date at the
                    top of the policy.
                  </p>
                </section>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Footer */}
      <Footer
        logo={
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-1 rounded-xl bg-gradient-to-br from-primary to-accent shadow-soft">
              <img 
                src="/logo.png" 
                alt="WebNest Icon"
                className="h-8 w-8 object-cover rounded-sm"
              />
            </div>
            <span className="text-2xl font-bold text-gradient">WebNest</span>
          </Link>
        }
        sections={footerSections}
        social={[
          {
            icon: <Globe className="h-5 w-5" />,
            href: "https://webnest.netlify.app",
            label: "Website"
          },
          {
            icon: <div className="p-1 rounded-xl bg-gradient-to-br from-primary to-accent shadow-soft">
              <img src="/logo.png" alt="WebNest Icon" className="h-5 w-5 object-cover rounded-sm" />
            </div>,
            href: "https://github.com/webnestpro",
            label: "GitHub"
          },
        ]}
      />
      
    </div>
  );
}