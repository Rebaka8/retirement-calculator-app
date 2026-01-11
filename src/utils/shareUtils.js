// ============================================
// CLOUDINARY CONFIGURATION
// ============================================
const CLOUDINARY_CONFIG = {
    cloudName: 'dvsvxtngs',
    uploadPreset: 'fire-freedom-planner'
};

// ============================================
// SMART UPLOAD - PDF (RAW)
// ============================================
const uploadToCloudinary = async (pdfBlob) => {
    console.log('📤 Uploading PDF to Cloudinary...');
    console.log('📦 Size:', (pdfBlob.size / 1024).toFixed(2), 'KB');

    try {
        const formData = new FormData();

        const pdfFile = new File(
            [pdfBlob],
            `fire-report-${Date.now()}.pdf`,
            { type: 'application/pdf' }
        );

        formData.append('file', pdfFile);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

        const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`;

        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || 'Cloudinary upload failed');
        }

        const data = await response.json();

        console.log('✅ Upload success');
        console.log('🔗 Cloudinary URL:', data.secure_url);

        // IMPORTANT: Use secure_url directly (NO conversion)
        return {
            success: true,
            url: data.secure_url,
            publicId: data.public_id,
            bytes: data.bytes,
            format: data.format,
            resourceType: data.resource_type,
            createdAt: data.created_at
        };

    } catch (error) {
        console.error('❌ Upload error:', error);

        let message = 'Failed to upload PDF. ';
        if (error.message.includes('fetch')) {
            message += 'Check internet connection.';
        } else if (error.message.includes('401') || error.message.includes('403')) {
            message += 'Upload preset must be PUBLIC.';
        } else {
            message += error.message;
        }

        return { success: false, error: message };
    }
};

// ============================================
// SHARE HELPERS
// ============================================
const copyLinkToClipboard = async (link) => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(link);
            return { success: true, message: '✅ Link copied!' };
        } catch { }
    }

    try {
        const ta = document.createElement('textarea');
        ta.value = link;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);

        return { success: true, message: '✅ Link copied!' };
    } catch {
        return { success: false, error: 'clipboard_failed', link };
    }
};

const shareViaWhatsApp = (link, pdfBlob, popupWindow = null) => {
    const message = encodeURIComponent(link);

    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    // If mobile AND supports file sharing, try Native Share (Files)
    if (isMobile && navigator.share && navigator.canShare) {
        const file = new File([pdfBlob], 'FIRE-Freedom-Plan.pdf', {
            type: 'application/pdf'
        });

        if (navigator.canShare({ files: [file] })) {
            if (popupWindow) popupWindow.close(); // Close if we used native share
            navigator.share({
                files: [file],
                title: 'FIRE Freedom Plan'
            }).catch(() => { });
            return { success: true };
        }
    }

    // Fallback for Desktop: Use the generated Cloudinary Link
    const textMessage = encodeURIComponent(link);
    const url = `https://api.whatsapp.com/send?text=${textMessage}`;

    if (popupWindow) {
        popupWindow.location.href = url;
    } else {
        window.open(url, '_blank');
    }
    return { success: true };
};

const shareViaNative = async (link, pdfBlob) => {
    if (!navigator.share) {
        return copyLinkToClipboard(link);
    }

    try {
        const file = new File([pdfBlob], 'FIRE-Freedom-Plan.pdf', {
            type: 'application/pdf'
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: '📊 FIRE Freedom Plan'
            });
        } else {
            await navigator.share({
                title: 'FIRE Report',
                url: link
            });
        }

        return { success: true };
    } catch {
        return copyLinkToClipboard(link);
    }
};

const downloadPDF = (pdfBlob) => {
    try {
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FIRE-Freedom-Plan-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return { success: true };
    } catch {
        return { success: false };
    }
};

// ============================================
// MAIN HANDLER
// ============================================
export const handleShareReport = async (pdfBlob, reportData, platform = 'copy', popupWindow = null) => {
    try {
        let uploadResult = null;
        let shareLink = '';

        if (platform === 'copy' || platform === 'whatsapp') {
            // Upload to Cloudinary for "Copy Link" AND "WhatsApp" (Desktop)
            // This is required to share the "report" via WhatsApp Web without forcing a download.
            uploadResult = await uploadToCloudinary(pdfBlob);

            if (!uploadResult.success) {
                if (popupWindow) popupWindow.close();
                return {
                    success: false,
                    message: uploadResult.error,
                    fallbackAvailable: true
                };
            }

            // Generate Preview Link
            const cloudinaryUrl = uploadResult.url.replace(/\.pdf$/i, '.jpg');
            shareLink = `${window.location.origin}/report/preview?file=${encodeURIComponent(cloudinaryUrl)}`;
        }

        switch (platform) {
            case 'download':
                return downloadPDF(pdfBlob);

            case 'copy':
                return { ...(await copyLinkToClipboard(shareLink)), link: shareLink };

            case 'whatsapp':
                return shareViaWhatsApp(shareLink, pdfBlob, popupWindow);

            case 'native':
            case 'more':
                return shareViaNative(shareLink, pdfBlob);

            default:
                return downloadPDF(pdfBlob);
        }
    } catch (error) {
        if (popupWindow) popupWindow.close();
        return { success: false, message: error.message };
    }
};

export {
    downloadPDF,
    copyLinkToClipboard,
    shareViaWhatsApp,
    shareViaNative
};
