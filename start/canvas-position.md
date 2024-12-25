# Position properties

( Most of the texts and images on this page were copied from Position Properties – [Pos and Anchor](https://feniksdev.com/renpy-position-properties-pos-and-anchor/) and [align, xycenter, and offset](https://feniksdev.com/renpy-position-properties-align-xycenter-and-offset/). Feniks in these two pages explained very well the properties of Ren'py positioning, common to many other canvases including Pixi’VN )

Before we get into the different positioning properties, know that Pixi’VN considers the default for all position properties to be `{ x: 0, y: 0 }`, which corresponds to the top-left of the element you’re positioning.

Positive numbers will move the element to the right and down. So, something at a position of (200, 300) in the game will be 200 pixels from the left edge of the screen and 300 pixels from the top edge of the screen. Similarly, negative numbers move the element left and up relative to their starting position.

Position and anchor will make up the bulk of what you use to move elements around on the screen. It’s very important to understand how they work, because most of the other positioning properties act as some combination of these two properties.

## Position (pixel)

It comes in three main flavours: 
- `x`, for moving things left-to-right (along the x-axis)
- `y`, for moving things top-to-bottom (along the y-axis).
- `position`, ...

There is also a property that lets you set both xpos and ypos at the same time: pos. If you are using pos, you have to provide two numbers, separated by a comma. The first number is the xpos and the second is the ypos e.g. pos (200, 300) which positions the top-left corner of the image 200 pixels from the left and 300 pixels down from the top. pos (200, 300) is equivalent to xpos 200 ypos 300.

By default, the starting position for a screen element is the top-left corner of its container.

## Anchor

Next is anchor. It also comes in two main varieties: xanchor, which moves the anchor on the x-axis (left-to-right), and yanchor which moves the anchor on the y-axis (top-to-bottom). anchor lets you set both at the same time, much like pos e.g. anchor (0, 0).

By default, the anchor for a screen element is its top-left corner (0, 0).

---

While position seems pretty intuitive to understand – it’s just the position where the element is – what, exactly, is anchor?

Let’s think of it in terms of something you may be more familiar with. Instead of positioning an element on a screen, you are trying to pin a photo onto a cork board. You have three things: a cork board, a push pin, and a photograph. Let’s pretend that 1mm is equal to 1 pixel on a computer screen.

![17351596389764883495402859713640](https://github.com/user-attachments/assets/becfa6ac-1156-49ad-8ceb-17b06627be7c)

- The cork board is the screen, or the container you’re trying to position the element inside.
- The photograph is the element.
- Where you put the pin on the photo is the anchor of the photograph.
- Where you push the pin into on the cork board is the pos of the photograph.

By default in Pixi’VN, the push pin always starts in the top left corner of the photo, so to speak. If you want the top-left corner of the photo 200mm from the left side of the cork board, you will put it at xpos 200. If you also want the top-left corner 300mm down from the top of the board, you will put it at ypos 300.

![17351597056618553068745888144175](https://github.com/user-attachments/assets/c6955336-1c30-4518-8f05-edd950a1227e)

What if you want the center of the photo at 200mm x 300mm?

This means you need to move where the pin is relative to the photo. The pin will stay at the point (200, 300) on the cork board – you just need to center the photo around that point as well. This means you need to change the anchor of the photo.

Except in some rare cases, an anchor point is usually one of three values: 0.0, 0.5, or 1.0. Note that 1.0 is very different from 1 for positioning properties – see [Floats vs Integers](https://feniksdev.com/renpy-position-properties-pos-and-anchor/#floats-vs-integers). This is because usually you want to position elements relative to one of their edges, or relative to the center.

To set the anchor point of the photo to the center of the photo, you can use anchor (0.5, 0.5) (aka xanchor 0.5 yanchor 0.5). Remember that floats mean percentages, so 0.5 means that the anchor is 50% of the way across the photo and 50% of the way down the photo, putting it at the exact center.

## Align

Now with knowledge of pos and anchor under your belt, you’re ready to understand align. align combines anchor and pos. It sets both of them to the same value. This is really excellent shorthand for several examples you saw before – namely, the following have align equivalents:

![17351599464394619760866269081175](https://github.com/user-attachments/assets/905f8284-b58f-40d1-86b3-66170c6b2438)
![17351599588441465184865762162774](https://github.com/user-attachments/assets/b2e23f6a-8236-4769-8479-9d0255d42500)
![17351599755996849758281561582636](https://github.com/user-attachments/assets/3724b1c2-004a-4451-86a5-b8ee17130f13)
![17351599909265068327853750732595](https://github.com/user-attachments/assets/2d1dccf5-0f69-4a09-b04b-9880df0ba273)
![17351600069191572839632388213405](https://github.com/user-attachments/assets/09715c9a-dee4-48a8-acff-8c71b52836f2)
![17351600214426648210562421723893](https://github.com/user-attachments/assets/fc179863-a36f-4600-9e95-f5923a2d9d9a)

## Position with percentage
