import Banner from '../models/Banner.js';

// GET /api/banners - Get all active banners
export async function getBanners(req, res) {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST /api/admin/banners - Create new banner
export async function createBanner(req, res) {
  try {
    const { imageUrl, link, order } = req.body;
    const banner = await Banner.create({ imageUrl, link, order });
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// PUT /api/admin/banners/:id - Update banner
export async function updateBanner(req, res) {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// DELETE /api/admin/banners/:id - Delete banner
export async function deleteBanner(req, res) {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET /api/admin/banners - Get all banners (including inactive)
export async function getAllBannersAdmin(req, res) {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
