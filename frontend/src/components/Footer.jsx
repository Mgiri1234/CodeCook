function Footer(){
    return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-4">
    <p className="text-lg">© 2024 Md Kamran. All rights reserved.</p>
    <div className="mt-2">
        <a href="/about" className="text-white hover:text-blue-300 mx-2">About Us</a>
        <a href="/contact" className="text-white hover:text-blue-300 mx-2">Contact Us</a>
        <a href="/privacy" className="text-white hover:text-blue-300 mx-2">Privacy Policy</a>
        <a href="/terms" className="text-white hover:text-blue-300 mx-2">Terms of Service</a>
    </div>
</footer>
    )
}

export default Footer;