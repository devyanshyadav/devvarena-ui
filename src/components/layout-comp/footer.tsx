"use client";

const Footer = () => {
  return (
    <>
      <br />
      <footer className="p-1 px-4 flex text-center justify-center  backdrop-blur-sm items-center   bg-secondary">
        <div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Devvarena UI. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
