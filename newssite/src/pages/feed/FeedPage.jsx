// Composition root for the public site.
import { useFeed } from "./hooks/useFeed";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Navbar from "./ui/Navbar";
import Feed from "./ui/Feed";
import ContactSection from "./ui/ContactSection";
import Footer from "./ui/Footer";

export default function FeedPage() {
  useSmoothScroll();
  const { posts, status, error } = useFeed();

  return (
    <div id="home" className="min-h-screen">
      <Navbar />
      <Feed posts={posts} status={status} error={error} />
      <ContactSection />
      <Footer />
    </div>
  );
}
