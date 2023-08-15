precision mediump float;
uniform vec3 u_color;
uniform float u_timecolor;
uniform vec2 u_cursorcolor;

varying vec3 v_position;
varying vec2 v_uv;
varying float v_a_modulus;

void main(){
    gl_FragColor = vec4(v_a_modulus, v_uv.x, 1.0, u_color);    
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);    
    // gl_FragColor = vec4(u_cursorcolor.x, u_cursorcolor.y, 1.0, 1.0);    

    gl_FragColor.r = 1.0  + sin(u_timecolor);
    gl_FragColor.g = cos(u_timecolor);
    gl_FragColor.b = -sin(u_timecolor);
}