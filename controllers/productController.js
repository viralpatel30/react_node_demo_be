import { Product, Variant } from "../utils";
import apiResponse from "../utils/apiResponse";

export const createProduct = async (req, res) => {
  try {
    const { name, variants } = req.body;

    if (!name || !Array.isArray(variants) || variants.length === 0) {
      return res
        .status(400)
        .json(
          apiResponse(
            false,
            "Product name and at least one variant are required."
          )
        );
    }

    const product = await Product.create(
      {
        name,
        variants,
      },
      {
        include: [Variant],
      }
    );

    res
      .status(201)
      .json(apiResponse(true, "Product created successfully", product));
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json(apiResponse(false, "Failed to create product"));
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Variant,
          attributes: ["variantId", "name", "amount"],
        },
      ],
      order: [["productId", "DESC"]],
    });
    res.json(apiResponse(true, "Products fetched successfully", products));
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json(apiResponse(false, error.message || "Failed to fetch products"));
  }
};
