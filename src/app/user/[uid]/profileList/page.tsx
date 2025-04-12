import Analysis from "@/components/Analysis"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ProfileListPage() {
    return(
        <div>
            <Navbar />
            <Analysis />
            <Footer 
              githubUrl = "https://github.com/takapom",
              twitterUrl = "https://x.com/takapom_engin",
              instagramUrl = "https://www.instagram.com/takapondes/",
              blogUrl = "https://blog-site-ehel.vercel.app/",
            />
        </div>
    )
}
