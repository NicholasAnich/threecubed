precision mediump float;

uniform sampler2D u_texture;


varying vec2 v_uv;

void main() {
    // vec4 text_ = texture2D(u_texture,v_uv);
    // gl_FragColor = vec4(1.0,1.0,1.0, 1.0);
    vec3 color_texture = texture2D(u_texture, v_uv).brg;
    gl_FragColor = vec4(color_texture, 1.0);
    // gl_FragColor = text_;
}