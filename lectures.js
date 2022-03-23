/*
/////////////////////////////////////////////////
// 185. How the DOM Really Works

DOM - interface between browser and JS
we can create/modify/delete HTML elements
set styles, classes and attributes
listen and respond to events


Node - everything in DOM API is a node
- has it's own properties, some are inherited
- children
    - Element - tons of useful properties!
    - Text - stored within an elements
    - Comment
    - Document

- Element
    - HTMLElement
      - 1 child type for each element type you can see on page, like link, p, img, form

Inheritance
- all the children have access to all of the fields and methods available to their parents
- children also have their own, specific properties and methods

.querySelector() method is available both on document and element objects

EventTarget node
the root of all nodes
- contains methods like .addEventListener() and .removeEventListener()
- all of his children inherit these two methods!

we never manually create EventTarget node
*/

/////////////////////////////////////////////////
// 187. Styles, Attributes and Classes
