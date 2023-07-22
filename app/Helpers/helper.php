<?php

use Illuminate\Support\Str;

if (!function_exists('generateReference')) { /* Check_for "generateReference" */
    function generateReference()
    {
        $reference = (string) Str::uuid();
        $reference = str_replace('-', '', $reference);

        return $reference;
    }
} /* End_check for "generateReference" */


// create caption
if (!function_exists('createCaption')) {
    function createCaption($content)
    {
        // Remove HTML tags
        $plainText = strip_tags($content);

        // Remove shortcodes (if any)
        $plainText = preg_replace('/\[.*?\]/', '', $plainText);

        // Set the desired maximum length for the caption
        $maxCaptionLength = 150;

        // Create the caption from the content
        $caption = Str::limit($plainText, $maxCaptionLength);

        // If the content exceeds the maximum length, add an ellipsis at the end
        if (strlen($plainText) > $maxCaptionLength) {
            $caption .= '...';
        }

        return $caption;
    }
}
