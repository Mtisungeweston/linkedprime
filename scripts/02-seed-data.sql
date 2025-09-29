-- Seed data for news aggregator
-- Version 2.0 - Updated with more categories and real news sources

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Technology', 'technology', 'Tech news and innovations'),
  ('Business', 'business', 'Business and finance news'),
  ('Politics', 'politics', 'Political news and analysis'),
  ('Science', 'science', 'Scientific discoveries and research'),
  ('Health', 'health', 'Health and medical news'),
  ('Entertainment', 'entertainment', 'Entertainment and culture'),
  ('Sports', 'sports', 'Sports news and updates'),
  ('World', 'world', 'International news'),
  ('Environment', 'environment', 'Climate and environmental news'),
  ('Lifestyle', 'lifestyle', 'Lifestyle and culture')
ON CONFLICT (slug) DO NOTHING;

-- Insert well-known news sources
INSERT INTO sources (name, url, base_domain, scrape_config, fetch_frequency_minutes) VALUES
  (
    'BBC News',
    'https://www.bbc.com/news',
    'bbc.com',
    '{"article_selector": "article", "title_selector": "h2, h3", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    30
  ),
  (
    'CNN',
    'https://www.cnn.com',
    'cnn.com',
    '{"article_selector": "article, .card", "title_selector": "h3, .card__title", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    30
  ),
  (
    'Reuters',
    'https://www.reuters.com',
    'reuters.com',
    '{"article_selector": "article", "title_selector": "h3", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    30
  ),
  (
    'The Guardian',
    'https://www.theguardian.com',
    'theguardian.com',
    '{"article_selector": "article", "title_selector": "h3", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    30
  ),
  (
    'TechCrunch',
    'https://techcrunch.com',
    'techcrunch.com',
    '{"article_selector": "article.post-block", "title_selector": "h2.post-block__title", "link_selector": "a.post-block__title__link", "excerpt_selector": "div.post-block__content", "image_selector": "img.post-block__media__image"}',
    30
  ),
  (
    'The Verge',
    'https://www.theverge.com',
    'theverge.com',
    '{"article_selector": "article", "title_selector": "h2", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    30
  ),
  (
    'ESPN',
    'https://www.espn.com',
    'espn.com',
    '{"article_selector": "article, .contentItem", "title_selector": "h1, h2", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    30
  ),
  (
    'Bloomberg',
    'https://www.bloomberg.com',
    'bloomberg.com',
    '{"article_selector": "article", "title_selector": "h3", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    60
  ),
  (
    'National Geographic',
    'https://www.nationalgeographic.com',
    'nationalgeographic.com',
    '{"article_selector": "article", "title_selector": "h2, h3", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    60
  ),
  (
    'Scientific American',
    'https://www.scientificamerican.com',
    'scientificamerican.com',
    '{"article_selector": "article", "title_selector": "h2", "link_selector": "a", "excerpt_selector": "p", "image_selector": "img"}',
    60
  )
ON CONFLICT (url) DO NOTHING;

-- Insert sample articles (for testing)
INSERT INTO articles (
  source_id, 
  category_id, 
  title, 
  slug, 
  excerpt, 
  content, 
  author,
  source_url, 
  image_url,
  published_at, 
  content_hash,
  status
) VALUES
  (
    1,
    1,
    'AI Breakthrough: New Model Achieves Human-Level Performance',
    'ai-breakthrough-new-model-achieves-human-level-performance',
    'Researchers announce a significant milestone in artificial intelligence development with a new model that matches human performance across multiple benchmarks.',
    'In a groundbreaking development, researchers have unveiled a new AI model that demonstrates human-level performance across a wide range of cognitive tasks...',
    'Sarah Johnson',
    'https://example.com/ai-breakthrough-2025',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '2 hours',
    'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    'approved'
  ),
  (
    1,
    1,
    'Tech Giants Announce New Privacy Standards',
    'tech-giants-announce-new-privacy-standards',
    'Major technology companies collaborate on industry-wide privacy standards aimed at protecting user data.',
    'Leading technology companies have come together to establish comprehensive privacy standards...',
    'Michael Chen',
    'https://example.com/privacy-standards-2025',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '5 hours',
    'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    'approved'
  ),
  (
    2,
    2,
    'Global Markets Rally on Economic Recovery Signs',
    'global-markets-rally-on-economic-recovery-signs',
    'Stock markets worldwide show strong gains as economic indicators point to sustained recovery.',
    'Financial markets across the globe experienced significant gains today as new economic data...',
    'Emily Rodriguez',
    'https://example.com/markets-rally-2025',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '8 hours',
    'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
    'approved'
  ),
  (
    3,
    4,
    'Scientists Discover New Treatment for Rare Disease',
    'scientists-discover-new-treatment-for-rare-disease',
    'Medical researchers report promising results from clinical trials of a novel treatment approach.',
    'A team of international researchers has made a breakthrough in treating a rare genetic disorder...',
    'Dr. James Wilson',
    'https://example.com/medical-breakthrough-2025',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '12 hours',
    'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9',
    'approved'
  ),
  (
    1,
    1,
    'Quantum Computing Reaches New Milestone',
    'quantum-computing-reaches-new-milestone',
    'Researchers achieve record-breaking quantum coherence times, bringing practical quantum computers closer to reality.',
    'In a significant advancement for quantum computing, scientists have achieved unprecedented quantum coherence...',
    'Dr. Lisa Park',
    'https://example.com/quantum-milestone-2025',
    '/placeholder.svg?height=400&width=800',
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    'approved'
  )
ON CONFLICT (source_url) DO NOTHING;
