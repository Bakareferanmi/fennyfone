// Legal page content for the footer links. Edit the text here; the modal renders it as-is.
// Business terms (return window, refund timing, etc.) are sensible defaults; change them to match how fennyfone really operates.

export const LAST_UPDATED = 'October 7, 2026';
export const SUPPORT_WHATSAPP_URL = 'https://wa.me/2348123456789';

export type LegalSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

export type LegalPage = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const PRIVACY_POLICY: LegalPage = {
  title: 'Privacy Policy',
  intro:
    'This policy explains what information fennyfone collects when you browse the store, build a cart and send an order through WhatsApp, and how we look after it. We aim to follow the Nigeria Data Protection Act 2023 (NDPA).',
  sections: [
    {
      heading: '1. Information we collect',
      body: ['We only collect what we need to sell and deliver your order:'],
      list: [
        'Order details you type in at checkout: full name, WhatsApp phone number, delivery address, city or state, and optional delivery notes.',
        'The items in your cart, quantities and any promo code you apply.',
        'Your cookie preference, saved on your own device.',
        'Technical information your browser sends automatically, such as IP address and browser or device type, to the services that host this website and deliver its content.',
        'Messages and photos you send us on WhatsApp, for example when asking for support or a return.'
      ]
    },
    {
      heading: '2. How your order reaches us',
      body: [
        'Our checkout does not send your form to a database. When you tap "Order via WhatsApp", the site builds an order message from your cart and details and opens WhatsApp so you can send it to us yourself.',
        'Your cart is kept in your browser\'s memory only. It is cleared when you refresh or close the page.'
      ]
    },
    {
      heading: '3. How we use your information',
      list: [
        'To confirm your order, arrange payment and deliver your items.',
        'To contact you about your order, delivery, returns or warranty.',
        'To provide customer support and answer your questions.',
        'To prevent fraud and keep our store secure.',
        'To meet legal, tax and accounting obligations.'
      ],
      body: ['We do not sell your personal information.']
    },
    {
      heading: '4. Who we share it with',
      body: ['We share only what is needed, and only with:'],
      list: [
        'Delivery partners, who need your name, phone number and address to bring your order.',
        'Payment providers or banks, when you pay for an order.',
        'WhatsApp (Meta), the messaging service you use to place and discuss orders. Their own terms and privacy policy apply to messages sent through it.',
        'Hosting and content providers that serve this website. For example, product pictures are loaded from Unsplash, which can see your IP address and browser details when your device fetches them.',
        'Regulators, courts or law enforcement where the law requires it.'
      ]
    },
    {
      heading: '5. Cookies and similar storage',
      body: [
        'We use a small amount of storage on your device to remember your cookie choice. Optional categories (analytics and marketing) are off unless you switch them on. You can change your choice at any time from "Cookie Settings" in the footer.'
      ]
    },
    {
      heading: '6. How long we keep it',
      body: [
        'We keep order and delivery details for as long as needed to complete your order, handle returns and warranty claims, and satisfy tax and accounting rules. After that we delete or anonymise them.'
      ]
    },
    {
      heading: '7. Your rights',
      body: ['Under the NDPA you can ask us to:'],
      list: [
        'Tell you what personal data we hold about you and give you a copy.',
        'Correct information that is wrong or out of date.',
        'Delete your data, where we no longer need it.',
        'Restrict or object to how we use your data.',
        'Withdraw consent you have given us, at any time.'
      ]
    },
    {
      heading: '8. Complaints',
      body: [
        'If you are unhappy with how we handle your data, please contact us first and we will try to put it right. You also have the right to complain to the Nigeria Data Protection Commission (NDPC).'
      ]
    },
    {
      heading: '9. Security',
      body: [
        'We take reasonable steps to protect your information. WhatsApp encrypts personal messages end to end by default. No online service is completely risk free, so please do not send card numbers, PINs or passwords in chat.'
      ]
    },
    {
      heading: '10. Children',
      body: ['fennyfone is meant for adults. We do not knowingly collect information from anyone under 18.']
    },
    {
      heading: '11. Changes to this policy',
      body: ['If we change this policy we will update the date at the top of this page.']
    },
    {
      heading: '12. Contact us',
      body: ['To use any of your rights or ask a question about this policy, message our WhatsApp live support from the footer of this site.']
    }
  ]
};

export const REFUND_TERMS: LegalPage = {
  title: 'Refund Terms',
  intro:
    'We want you to be happy with what you buy. These terms explain how returns, refunds, exchanges and warranty claims work for orders placed through fennyfone.',
  sections: [
    {
      heading: '1. Faulty, damaged or wrong items',
      body: [
        'If your item arrives faulty, damaged or not what you ordered, tell us within 48 hours of delivery. Please record a short unboxing video or take clear photos, as this helps us resolve it quickly.',
        'We will offer you a free replacement or a full refund, including the delivery fee.'
      ]
    },
    {
      heading: '2. Change of mind',
      body: ['You can ask to return an item within 7 days of delivery if:'],
      list: [
        'It is unused, unopened and still sealed in its original packaging.',
        'All accessories, manuals and the receipt or order message are included.',
        'It has not been activated, registered or set up.'
      ]
    },
    {
      heading: '3. What we cannot refund',
      list: [
        'Phones, tablets and watches that have been opened, activated or used, unless they are faulty.',
        'Earbuds and headphones once the hygiene seal is broken, unless they are faulty.',
        'Damage caused by drops, liquids, misuse, unofficial repairs or opening the device.',
        'Items with missing, altered or removed serial numbers or seals.',
        'Delivery fees, except where the problem was our mistake.'
      ]
    },
    {
      heading: '4. How to request a return',
      list: [
        'Message our WhatsApp live support with your name, your order details and photos or video.',
        'We will reply within 2 business days to approve the request and explain how to send the item back.',
        'Please do not send anything back before we approve it.'
      ]
    },
    {
      heading: '5. Inspection and refunds',
      body: [
        'We inspect every returned item when it arrives. Once approved, we refund you to the way you paid within 5 to 10 business days.',
        'If you used a promo code, the refund is the amount you actually paid after the discount.'
      ]
    },
    {
      heading: '6. Exchanges',
      body: ['If you would rather swap an item for another one, tell us when you request the return. Exchanges depend on stock, and any price difference is paid or refunded.']
    },
    {
      heading: '7. Cancelling an order',
      body: ['You can cancel for a full refund any time before your order is dispatched. Message us on WhatsApp as soon as possible. Once an order is on its way, the return rules above apply.']
    },
    {
      heading: '8. Warranty',
      body: [
        'Products come with the official manufacturer warranty where one is stated on the product. Warranty claims can be made through us or the manufacturer\'s service centre. Warranty does not cover physical or liquid damage.'
      ]
    },
    {
      heading: '9. Need help?',
      body: ['Open our WhatsApp live support from the footer of this site and we will help you sort it out.']
    }
  ]
};

export const COOKIE_CATEGORIES = [
  {
    key: 'necessary' as const,
    title: 'Essential',
    always: true,
    text: 'Remembers your cookie choice and keeps the store working. These are always on.'
  },
  {
    key: 'analytics' as const,
    title: 'Analytics',
    always: false,
    text: 'Helps us understand which pages and products are popular. We do not run analytics today. If we add it, it will only run when this is switched on.'
  },
  {
    key: 'marketing' as const,
    title: 'Marketing',
    always: false,
    text: 'Used to show relevant offers on other sites. We do not use marketing cookies today. If we add them, they will only run when this is switched on.'
  }
];
