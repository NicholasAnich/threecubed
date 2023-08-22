precision mediump float;

varying vec2 v_uv;
varying vec3 v_position;
uniform float u_time;


// *Random=================================================================================================* 
// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// *========================================================================================================*

void main() {
    // vec2 copy_uv = v_uv;

    // *Mix Function
    // vec3 mixing = mix(vec3(0.0,0.0,1.0), vec3(0.0,1.0,0.0), v_uv.x);

    // *Clamp Function
    // vec3 color = vec3(1.0,1.0,1.0);
    // color.r = clamp(v_uv.y,0.0, 1.0);
    // color.g = clamp(v_uv.x, 0.0, 1.0);
    // color.b = clamp(v_uv.x, 0.0, 1.0);

    // *Step Function
    // vec3 color = vec3(1.0,1.0,1.0);
    // color.r = step(0.0, v_position.x);
    // color.g = step(0.0, v_position.y);

    // *SmoothStep Function
    // vec3 color = vec3(1.0,1.0,1.0);
    // color.r = smoothstep(0.0, 0.04, v_position.x);
    // // color.g = smoothstep(0.0,0.04, v_position.y);
    // color.g = smoothstep(0.1,0.05, v_position.y);


    // *Modulus Function
    // vec3 color = vec3(1.0, 1.0, 1.0);
    // float mod_ =mod(v_uv.y*5.0,1.0);

    // gl_FragColor = vec4(mod_,mod_,mod_,1.0);
    
    // *Length Function
    // gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    // float vector_length = length(vec2(0.4,0.3));
    // gl_FragColor.r = vector_length;


    // *Distance Function
    // float distance_ = distance(v_uv, vec2(0.5));
    // gl_FragColor = vec4(distance_,distance_,distance_,1.0);

    // *RANDOM FUNCTION
    // vec3 color = random(v_uv)*vec3(.5);
    // gl_FragColor = vec4(color, 1.0);

    // float simple_x = 0.5+clamp(snoise(vec2(v_uv *20.0+u_time)),0.0,1.0);
    // gl_FragColor = vec4(simple_x*0.2,simple_x,simple_x, 1.0);
    // gl_FragColor = vec4(vec3(simple_x), 1.0);




    // if(copy_uv.x > 0.5) {
    //     copy_uv.x = 0.0;
    // } else {
    //     copy_uv.x = 1.0;
    // }

    // float copy_uvx = step(v_uv.x, 0.5);

    // gl_FragColor = vec4(copy_uv, 1.0, 1.0);
    // gl_FragColor = vec4(copy_uvx,v_uv.y, 1.0, 1.0);

    // *Mixing colors
    // gl_FragColor = vec4(mixing, 1.0);

    // *Clamping colors
    // gl_FragColor = vec4(color, 1.0);

}