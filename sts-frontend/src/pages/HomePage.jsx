import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";

function HomePage() {
  const [order, setOrder] = useState(initialOrder)

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 1000)
    return () => clearTimeout(timeout)
  }, [order])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        className="flex gap-6 mb-10"
        variants={containerCards}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemCards}>
          <Link to="/signup/customer" className="no-underline text-foreground">
            <Card className="w-[220px] text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
              <CardHeader className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(240 5.9% 90%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Sign up</CardTitle>
                <CardDescription className="text-muted-foreground">Click here as Customer</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={itemCards}>
          <Link to="/login" className="no-underline text-foreground">
            <Card className="w-[220px] text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
              <CardHeader className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(240 5.9% 90%)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m10 17 5-5-5-5" />
                    <path d="M15 12H3" />
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Login</CardTitle>
                <CardDescription className="text-muted-foreground">Click here to login</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>
        <motion.div variants={itemCards}>
          <Link to="/signup/driver" className="no-underline text-foreground">
            <Card className="w-[220px] text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
              <CardHeader className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(240 5.9% 90%)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                    <path d="M15 18H9" />
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                    <circle cx="17" cy="18" r="2" />
                    <circle cx="7" cy="18" r="2" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Sign up</CardTitle>
                <CardDescription className="text-muted-foreground">Click here as Driver</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>
      </motion.div>

      <div style={wrapper}>
        <ul style={container}>
          {order.map((backgroundColor) => (
            <motion.li
              key={backgroundColor}
              layout
              transition={spring}
              style={{ ...item, backgroundColor }}
            />
          ))}
        </ul>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={projectName}
        >
          Storage Tracker System
        </motion.p>
      </div>
    </div>
  )
}

const initialOrder = ["hsl(0 0% 98%)", "hsl(240 5% 64.9%)", "hsl(240 5.2% 33.9%)", "hsl(240 3.7% 15.9%)"]

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}


const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
}

const wrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
}

const container = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  width: 300,
  justifyContent: "center",
  alignItems: "center",
}

const item = {
  width: 48,
  height: 48,
  borderRadius: "10px",
}

const projectName = {
  fontSize: "14px",
  fontWeight: 500,
  color: "hsl(240 5.9% 90%)",
  fontFamily: "monospace",
  letterSpacing: "2px",
  marginTop: "8px",
}

const containerCards = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.6
    },
  },
};

const itemCards = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default HomePage;