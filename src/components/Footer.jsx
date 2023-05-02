import React from "react";

const Footer = () => {
  return (
    <>
      <div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        <svg class="bi" width="30" height="24"></svg>
      </a>
      <span class="text-muted mb-1"><img src="/logo copy.png" alt="logo" width={40} /><span>   </span>&copy; 2023 Saddam Ecommerce, Inc</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li></li>
      <li class="ms-3"><a class="text-muted" href="https://www.linkedin.com/in/saddam-hussain-3719b2248"><i class="fa fa-linkedin-square" style={{"font-size":"30px"}}></i></a></li>
      <li class="ms-3"><a class="text-muted" href="https://github.com/SHnice"><i class="fa fa-github-square" style={{"font-size":"30px"}}></i></a></li>
      <li class="ms-3"><a class="text-muted" href="https://www.facebook.com/h.saarim"><i class="fa fa-facebook-square" style={{"font-size":"30px"}}></i></a></li>
    </ul>
  </footer>
</div>
    </>
  );
};

export default Footer;
