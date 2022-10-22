cmake_minimum_required (VERSION 3.8)

add_executable (libUvTest "libUvTest.c" "libUvTest.h")
target_link_libraries(libUvTest uv)
