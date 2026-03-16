import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// Default values for pagination and sorting images
const DEFAULT_PAGE_SIZE = 9;
const DEFAULT_SORT_BY = 'id';

// Sorts images based on the the sorting critria
const sortImages = (images, sortBy) => {
    const normalizedSortBy = sortBy === 'date' ? 'date' : DEFAULT_SORT_BY;

    return [...images].sort((firstImage, secondImage) => {
        if (normalizedSortBy === 'date') {
            return secondImage.id - firstImage.id;
        }

        return firstImage.id - secondImage.id;
    });
};

// Fetching images from api
const getImagesByCategory = async (req, res) => {
    const { category } = req.params;
    const { page = '1', sortBy = DEFAULT_SORT_BY } = req.query;
    const API_KEY = process.env.API_KEY;
    const pageNumber = Number.parseInt(page, 10) || 1;

    if (!API_KEY) {
        return res.status(500).json({ message: 'Missing Pixabay api key' });
    }

    if (pageNumber < 1) {
        return res.status(400).json({ message: 'The page query parameter must be at least 1' });
    }

    // api endpoint
    const url = 'https://pixabay.com/api/';

    try {
        const response = await axios.get(url, {
            params: {
                key: API_KEY,
                q: category,
                page: pageNumber,
                per_page: DEFAULT_PAGE_SIZE,
            },
        });

        const images = sortImages(response.data.hits ?? [], sortBy);

        res.status(200).json({
            items: images,
            category,
            page: pageNumber,
            pageSize: DEFAULT_PAGE_SIZE,
            sortBy,
            totalHits: response.data.totalHits ?? 0,
            totalPages: Math.ceil((response.data.totalHits ?? 0) / DEFAULT_PAGE_SIZE),
        });
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Error fetching images from Pixabay';

        res.status(status).json({ message });
    }
};

export { getImagesByCategory };