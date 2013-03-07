from struct import unpack

import sys

class Filter:

  def __init__(self, acv_file_path, name):
    self.name = name
    with open(acv_file_path, 'rb') as acv_file:
      self.curves = self._read_curves(acv_file)
  
  def _map(self, x):
    return long(x) / 255.0
  
  def _read_curves(self, acv_file):
    _, nr_curves = unpack('!hh', acv_file.read(4))
    for i in xrange(0, nr_curves):
		if (i > 0 and i < 4):
			print "[",
		num_curve_points, = unpack('!h', acv_file.read(2))
		for j in xrange(0, num_curve_points):
			y, x = unpack('!hh', acv_file.read(4))
			if (i > 0 and i < 4):
				print "[%.2f,%.2f]"% (self._map(x), self._map(y)),
				if (j < num_curve_points - 1):
					print ",",
		if (i > 0 and i < 4):
			print "]",
		if (i > 0 and i < 3):
			print ",",


if __name__ == '__main__':

  if len(sys.argv) < 2:
    print "Wrong number of arguments"
    print """  Usage: \
          python filter.py [curvefile] """
  else:
    img_filter = Filter(sys.argv[1], 'crgb')