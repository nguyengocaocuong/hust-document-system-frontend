export const checkURLType = (url) => {
    const googleDriveRegex = new RegExp(
      '^(https?:\\/\\/)?(www\\.)?(drive\\.google\\.com\\/(file\\/d\\/|open\\?id=)|docs\\.google\\.com\\/(document\\/d\\/|spreadsheets\\/d\\/|presentation\\/d\\/|forms\\/d\\/))'
    );
    const officeRegex = new RegExp(
      '^https?:\\/\\/(www\\.)?office\\.com\\/(.*\\/|embed\\/|v2\\/(?:[a-z]{2}-[a-z]{2}\\/)?)?((powerpoint|ppt)(?:x|m)?|word|excel|xls)(?:\\/|$)'
    );
    const youtubeRegex = new RegExp(
      '^https?:\\/\\/(?:www\\.)?(?:youtu\\.be\\/|youtube(?:-nocookie)?\\.com\\/(?:embed\\/|v\\/|.*(?:[?&](?:vi?=|list(?:Type)?=|search(?:_query)?=|rel(?:atedTo)?=|results(?:_position)?=))|\\/yt\\/(?:cc\\/|cropper\\/|licensing\\/|partner\\/|playlist\\/|t\\/|watch_as3(?:_|$)|swf\\/|embed\\/|videoseries(?:[^\\/]|$))))'
    );
    const githubRegex = new RegExp(
      '^https?:\\/\\/(?:www\\.)?github\\.com\\/[a-zA-Z0-9_-]+\\/[a-zA-Z0-9_-]+'
    );
    const dropboxRegex = new RegExp(
      '^https?:\\/\\/(?:www\\.)?dropbox\\.com\\/[a-zA-Z0-9_-]+\\/[a-zA-Z0-9_-]+'
    );
    const oneDriveRegex = new RegExp(
      '^https?:\\/\\/(?:www\\.)?1drv\\.ms\\/[a-zA-Z0-9_-]+'
    );
    const vimeoRegex = new RegExp('^https?:\\/\\/(?:www\\.)?vimeo\\.com\\/[0-9]+');
    const bitbucketRegex = new RegExp(
      '^https?:\\/\\/(?:www\\.)?bitbucket\\.org\\/[a-zA-Z0-9_-]+\\/[a-zA-Z0-9_-]+'
    );
    const facebookRegex = new RegExp(
      '^https?:\\/\\/(?:www\\.)?facebook\\.com\\/[a-zA-Z0-9_-]+'
    );
    
    if (facebookRegex.test(url)) {
      return 'Facebook';
    }
    
    if (googleDriveRegex.test(url)) {
      return 'Google Drive';
    } else if (officeRegex.test(url)) {
      return 'Microsoft Office';
    } else if (youtubeRegex.test(url)) {
      return 'YouTube';
    } else if (githubRegex.test(url)) {
      return 'GitHub';
    } else if (dropboxRegex.test(url)) {
      return 'Dropbox';
    } else if (oneDriveRegex.test(url)) {
      return 'OneDrive';
    } else if (vimeoRegex.test(url)) {
      return 'Vimeo';
    }else if(bitbucketRegex.test(url)){
        return 'Bit BoxKet'
    }
    return 'Unknow'
}  