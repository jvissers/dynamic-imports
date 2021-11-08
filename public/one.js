const hello = () => {
    console.log('Hello from one');
};

export default hello;

/**
 * http://host:port => home page
 * http://host:port/documents/jaarverslag-2021                         => jaarverslag 2021 - current version
 * http://host:port/documents/jaarverslag-2021/versions/1.1.0          => jaarverslag 2021 - specific version
 * http://host:port/documents/jaarverslag-2021/toc                     => jaarverslag 2021 - current version, table of contents
 * http://host:port/documents/jaarverslag-2021/section/chapter-1       => jaarverslag 2021 - current version, section chapter-1 - current version
 * http://host:port/documents/jaarverslag-2021/section/chapter-1/versions/2.0.1
 * http://host:port/documents/jaarverslag-2021/section/chapter-1?edit  => edit chapter-1
 *     - get data for chapter one
 *     - get (cached) editor instance for chapter one
 */