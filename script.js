// Central Configuration
const CONFIG = {
  // Insert Naya's WhatsApp number (International format without leading + or 00)
  whatsappNumber: "2340000000000", 
  
  // Insert Naya's Online Store URL (e.g., Selar, Square, Shopify)
  storeUrl: "https://your-store-link.com" 
};

document.addEventListener("DOMContentLoaded", () => {

  // 1. Assign E-Commerce Store URL dynamically to all target links
  const shopLinks = document.querySelectorAll(".shop-link");
  shopLinks.forEach(link => {
    link.href = CONFIG.storeUrl;

const floatingWhatsapp = document.getElementById("floatingWhatsapp");
if (floatingWhatsapp) {
  floatingWhatsapp.addEventListener("click", (e) => {
    e.preventDefault();
    triggerWhatsAppRedirect("Hi Naya! I am browsing your website and have a quick question.");
  });
}

  });

  // 2. Core helper to handle structured WhatsApp redirection
  const triggerWhatsAppRedirect = (customMessage) => {
    const encodedMessage = encodeURIComponent(customMessage);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // 3. Hero Section WhatsApp CTA
  const heroWhatsappBtn = document.getElementById("heroWhatsappBtn");
  if (heroWhatsappBtn) {
    heroWhatsappBtn.addEventListener("click", () => {
      triggerWhatsAppRedirect("Hello Naya, I am inquiring about your handcrafted crochet collection after reviewing your website.");
    });
  }

  // 4. Custom Order Section WhatsApp CTA
  const customWhatsappBtn = document.getElementById("customWhatsappBtn");
  if (customWhatsappBtn) {
    customWhatsappBtn.addEventListener("click", () => {
      triggerWhatsAppRedirect("Hello Naya, I would like to commission a custom crochet design. Please let me know your availability and requirements.");
    });
  }

  // 5. Product Collection Specific "Order Custom" Buttons
  const productButtons = document.querySelectorAll(".whatsapp-order-btn");
  productButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const productName = e.target.getAttribute("data-product");
      triggerWhatsAppRedirect(`Hello Naya, I would like to request a custom commission based on your '${productName}' collection.`);
    });
  });

  // 6. Footer WhatsApp Link Direct Trigger
  const footerWhatsapp = document.getElementById("footerWhatsapp");
  if (footerWhatsapp) {
    footerWhatsapp.addEventListener("click", (e) => {
      e.preventDefault();
      triggerWhatsAppRedirect("Hello Naya, reaching out to connect with you from your website footer.");
    });
  }

});
