import React, { useState, useEffect } from 'react';
import { Download, Loader2, ExternalLink, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Logo from '../Logo';


const ReportPreview = () => {
    const params = new URLSearchParams(window.location.search);
    const fileUrl = params.get('file');

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!fileUrl) return;

        const loadPages = async () => {
            try {
                setLoading(true);
                // Convert PDF URL to Image URL base
                // High Quality: density=300 (print quality), quality=100, format=jpg

                // 1. Remove extension (.pdf or .jpg)
                const baseUrl = fileUrl.replace(/\.(pdf|jpg|jpeg)$/i, '');

                // 2. Insert transformations
                const [prefix, suffix] = baseUrl.split('/upload/');

                if (!prefix || !suffix) {
                    throw new Error("Invalid Cloudinary URL format");
                }

                const loadedImages = [];
                let pageNum = 1;
                let hasMore = true;
                const MAX_PAGES = 8; // Increased limit

                while (hasMore && pageNum <= MAX_PAGES) {
                    // w_2480 = A4 width at high DPI
                    // q_100 = Max quality
                    const imageUrl = `${prefix}/upload/w_2000,q_90,f_jpg,pg_${pageNum}/${suffix}`;

                    try {
                        const res = await fetch(imageUrl, { method: 'HEAD' });
                        if (res.ok) {
                            loadedImages.push(imageUrl);
                            pageNum++;
                        } else {
                            hasMore = false;
                        }
                    } catch (e) {
                        console.warn("Could not verify page", pageNum);
                        hasMore = false;
                    }
                }

                if (loadedImages.length === 0) {
                    // Fallback check failed, assume Page 1 exists
                    loadedImages.push(`${prefix}/upload/w_2000,q_90,f_jpg,pg_1/${suffix}`);
                }

                setImages(loadedImages);
                setLoading(false);

            } catch (err) {
                console.error("Image gen error:", err);
                setError("Could not generate preview images.");
                setLoading(false);
            }
        };

        loadPages();
    }, [fileUrl]);

    // Helper to download image
    const downloadImage = async (url, pageNum) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `FIRE-Report-Page-${pageNum}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (e) {
            console.error("Download failed:", e);
            // Fallback to direct link
            window.open(url, '_blank');
        }
    };

    if (!fileUrl) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] text-slate-900">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4 border border-slate-100">
                    <h2 className="text-xl font-bold mb-2">Invalid Link</h2>
                    <p className="text-slate-500">The report link appears to be invalid.</p>
                </div>
            </div>

        );
    }

    // URL for the first page JPG (Summary)
    const summaryJpgUrl = images.length > 0 ? images[0] : null;

    return (
        <div className="h-screen flex flex-col bg-[#F7F9FC]">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm z-20">

                <div className="flex items-center gap-2">
                    <Logo className="w-8 h-8" />
                    <span className="font-bold text-lg hidden sm:block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FIRE Freedom Plan</span>
                    <span className="font-bold text-lg sm:hidden bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FIRE Plan</span>
                </div>



                <div className="flex items-center gap-2">
                    <button
                        onClick={() => summaryJpgUrl && downloadImage(summaryJpgUrl, 1)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0A2540] hover:bg-[#102A44] text-white rounded-full text-sm font-medium transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                    >
                        <ImageIcon size={16} />

                        <span className="hidden sm:inline">Download Image</span>
                        <span className="sm:hidden">Save</span>
                    </button>
                </div>
            </div>

            {/* Viewer Area */}
            <div className="flex-1 w-full overflow-y-auto p-4 sm:p-8 bg-transparent scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                <div className="max-w-4xl mx-auto flex flex-col gap-8">

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                            <span className="text-slate-400 text-sm font-medium">Generating High-Res Preview...</span>
                        </div>
                    )}

                    {!loading && images.map((imgUrl, index) => (
                        <div key={index} className="group relative bg-white rounded shadow-2xl overflow-hidden min-h-[500px]">
                            {/* Download Button Overlay */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                    onClick={() => downloadImage(imgUrl, index + 1)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#0A2540]/90 backdrop-blur text-white rounded-lg shadow-lg hover:bg-[#0A2540] transition-colors text-sm font-medium"
                                >
                                    <Download size={14} />
                                    Save Page {index + 1}
                                </button>
                            </div>

                            <img
                                src={imgUrl}
                                alt={`Page ${index + 1}`}
                                className="w-full h-auto block"
                                loading="lazy"
                            />
                        </div>
                    ))}

                    {!loading && images.length === 0 && (
                        <div className="text-center py-20 text-slate-400 flex flex-col items-center gap-4">
                            <AlertCircle className="w-12 h-12 opacity-50" />
                            <p>Preview not available.</p>
                        </div>
                    )}

                    {!loading && (
                        <div className="text-center pb-8 pt-4">
                            <p className="text-slate-500 text-sm mb-4">
                                End of Report
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportPreview;
